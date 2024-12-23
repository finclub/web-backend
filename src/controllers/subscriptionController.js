import pool from '../config/db.js';

// Get all subscriptions

export const getAllSubscriptions = async (req, res) => {
    try {
      // Fetch only active subscriptions
      const result = await pool.query(`
        SELECT * 
        FROM member_subscriptions
        WHERE active = TRUE
        ORDER BY created_at DESC
      `);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Get a single subscription by ID
export const getSubscriptionById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM member_subscriptions WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new subscription
export const createSubscription = async (req, res) => {
  const {
    club_id,
    name,
    category,
    price,
    billing_cycle,
    description,
    active,
  } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO member_subscriptions (
        club_id, name, category, price, billing_cycle, description, active
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `,
      [club_id, name, category, price, billing_cycle, description, active]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing subscription
// export const updateSubscription = async (req, res) => {
//   const { id } = req.params;
//   const {
//     club_id,
//     name,
//     category,
//     price,
//     billing_cycle,
//     description,
//     active,
//   } = req.body;

//   try {
//     const result = await pool.query(
//       `
//       UPDATE member_subscriptions
//       SET 
//         club_id = $1, name = $2, category = $3, price = $4, billing_cycle = $5, 
//         description = $6, active = $7, updated_at = CURRENT_TIMESTAMP
//       WHERE id = $8
//       RETURNING *
//       `,
//       [club_id, name, category, price, billing_cycle, description, active, id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Subscription not found' });
//     }
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };





export const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const {
    club_id,
    name,
    category,
    price,
    billing_cycle,
    description,
    active,
  } = req.body;

  // Input Validation
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid or missing subscription ID' });
  }

  if (!club_id || isNaN(club_id)) {
    return res.status(400).json({ error: 'Invalid or missing club_id' });
  }

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing name' });
  }

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing category' });
  }

  if (!price || isNaN(price) || price <= 0) {
    return res.status(400).json({ error: 'Invalid or missing price' });
  }

  const validBillingCycles = ['monthly', 'yearly', 'weekly'];
  if (!billing_cycle || !validBillingCycles.includes(billing_cycle)) {
    return res.status(400).json({
      error: `Invalid billing_cycle. Accepted values are: ${validBillingCycles.join(', ')}`,
    });
  }

  if (typeof active !== 'boolean') {
    return res.status(400).json({ error: 'Invalid or missing active status' });
  }

  try {
    // Update the subscription only if it is active
    const result = await pool.query(
      `
      UPDATE member_subscriptions
      SET 
        club_id = $1, name = $2, category = $3, price = $4, billing_cycle = $5, 
        description = $6, active = $7, updated_at = CURRENT_TIMESTAMP
      WHERE id = $8 AND active = TRUE
      RETURNING *
      `,
      [club_id, name, category, price, billing_cycle, description, active, parseInt(id)]
    );

    // Check if the subscription exists and is active
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Subscription not found or is inactive' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// Delete a subscription
export const deleteSubscription = async (req, res) => {
    const { id } = req.params;
  
    // Validate id
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid or missing subscription ID' });
    }
  
    try {
      // Update the 'active' status to false instead of deleting the record
      const result = await pool.query(
        `
        UPDATE member_subscriptions
        SET active = FALSE, updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING *
        `,
        [parseInt(id)]
      );
  
      // Check if the subscription exists
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
  
      res.status(200).json({
        message: 'Subscription status set to inactive successfully',
        subscription: result.rows[0],
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  