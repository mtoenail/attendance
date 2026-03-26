import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { initDb, getUserByEmail, findOrCreateGoogleUser } from './db.js';
import { OAuth2Client } from 'google-auth-library';
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'dummy_client_id');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'licet_atelier_super_secret_key_2026';

app.use(cors());
app.use(express.json());

// Initialize Database
initDb();

// Google OAuth Endpoint
app.post('/api/auth/google', async (req, res) => {
  const { token, role } = req.body;
  if (!token || !role) return res.status(400).json({ message: 'Token and role required.' });

  try {
    let email = '';
    // Dev bypass if token is a "dev_token_" (easy mode testing without client ID setup)
    if (token.startsWith('dev_token_')) {
      email = token.replace('dev_token_', '');
    } else {
      const ticket = await googleClient.verifyIdToken({
        idToken: token,
      });
      const payload = ticket.getPayload();
      email = payload.email;
    }

    if (!email.endsWith('@licet.ac.in') && !email.endsWith('@licet.edu')) {
      return res.status(403).json({ message: 'Access denied. You must use a @licet.ac.in or @licet.edu account.' });
    }

    const user = await findOrCreateGoogleUser(email, role);

    if (user.role !== role) {
       return res.status(403).json({ message: `Account exists with ${user.role} role. You cannot login as ${role}.` });
    }

    const jwtToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      message: 'Google login successful',
      token: jwtToken,
      user
    });

  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ message: 'Invalid Google token' });
  }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  const { role, email, password } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: 'Email, password, and role selection are required.' });
  }

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. User not found.' });
    }

    // Strict role check to segment dashboard access
    if (user.role !== role) {
      return res.status(403).json({ message: `Access denied. You do not have ${role.toUpperCase()} privileges.` });
    }

    // Password validation using Bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials. Incorrect password.' });
    }

    // Success - generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      message: 'Authentication successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Digital Atelier Backend running natively on http://localhost:${PORT}`);
});
