import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';

const db = new sqlite3.Database('./attendance.db', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  }
});

// Seed data
export const initDb = () => {
  db.serialize(() => {
    // Create Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT
    )`);

    // Check if users exist, if not seed globally
    db.get('SELECT COUNT(*) as count FROM users', async (err, row) => {
      if (err) return console.error(err);
      
      if (row.count === 0) {
        console.log('Seeding initial users for testing...');
        const stmt = db.prepare('INSERT INTO users (email, password, role) VALUES (?, ?, ?)');
        
        // Use password123 as a default password test
        const hashStudent = await bcrypt.hash('password123', 10);
        const hashTeacher = await bcrypt.hash('password123', 10);
        const hashAdmin = await bcrypt.hash('password123', 10);

        stmt.run('student@licet.edu', hashStudent, 'student');
        stmt.run('teacher@licet.edu', hashTeacher, 'teacher');
        stmt.run('admin@licet.edu', hashAdmin, 'admin');
        
        stmt.finalize();
        console.log('Database seeding complete.');
      }
    });
  });
};

export const findOrCreateGoogleUser = (email, role) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) return reject(err);
      if (row) return resolve(row);
      
      // Auto-provisioning new account per @licet.ac.in rules
      const dummyPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
      db.run('INSERT INTO users (email, password, role) VALUES (?, ?, ?)', [email, dummyPassword, role], function(insertErr) {
        if (insertErr) return reject(insertErr);
        db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err2, newUser) => {
          if (err2) return reject(err2);
          resolve(newUser);
        });
      });
    });
  });
};

export const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

export default db;
