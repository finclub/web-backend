import pool from '../config/db.js';

// Get all members
export const getAllMembers = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * 
      FROM members
      ORDER BY created_at DESC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single member by ID
export const getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM members WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new member
export const createMember = async (req, res) => {
  const {
    name,
    email,
    phone_number,
    dob,
    gender,
    emergency_contact_name,
    emergency_contact_number,
    manual_receipt_number,
    profile_pic,
    reference_type,
    subscription_id,
    add_on_services,
    created_by,
    active,
  } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO members (
        name, email, phone_number, dob, gender, emergency_contact_name, 
        emergency_contact_number, manual_receipt_number, profile_pic, reference_type, 
        subscription_id, add_on_services, created_by, active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
      `,
      [
        name, email, phone_number, dob, gender, emergency_contact_name,
        emergency_contact_number, manual_receipt_number, profile_pic, reference_type,
        subscription_id, add_on_services, created_by, active
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing member
export const updateMember = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    phone_number,
    dob,
    gender,
    emergency_contact_name,
    emergency_contact_number,
    manual_receipt_number,
    profile_pic,
    reference_type,
    subscription_id,
    add_on_services,
    active,
  } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE members
      SET 
        name = $1, email = $2, phone_number = $3, dob = $4, gender = $5, 
        emergency_contact_name = $6, emergency_contact_number = $7, 
        manual_receipt_number = $8, profile_pic = $9, reference_type = $10, 
        subscription_id = $11, add_on_services = $12, active = $13, 
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $14
      RETURNING *
      `,
      [
        name, email, phone_number, dob, gender, emergency_contact_name,
        emergency_contact_number, manual_receipt_number, profile_pic, reference_type,
        subscription_id, add_on_services, active, id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a member
export const deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM members WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
