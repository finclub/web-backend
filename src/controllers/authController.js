import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

// User Registration
export const registerUser = async (req, res) => {
  const { name, phone_number, email, password, role } = req.body;

  try {
    // Validate input
    if (!name || !phone_number || !password || !role) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const query = `
      INSERT INTO users (name, phone_number, email, password, role)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, phone_number, email, role, created_at
    `;
    const values = [name, phone_number, email, hashedPassword, role];

    const result = await pool.query(query, values);

    // Return success response
    res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0],
    });
  } catch (error) {
    if (error.code === '23505') {
      // Handle unique constraint violations
      res.status(400).json({ message: 'Phone number or email already exists.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// User Login
export const loginUser = async (req, res) => {
  const { phone_number, password } = req.body;

  try {
    // Validate input
    if (!phone_number || !password) {
      return res.status(400).json({ message: 'Phone number and password are required.' });
    }

    // Check if user exists
    const query = 'SELECT * FROM users WHERE phone_number = $1';
    const result = await pool.query(query, [phone_number]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const user = result.rows[0];

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
    //   user: { id: user.id, name: user.name, phone_number: user.phone_number, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
