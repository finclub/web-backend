import memberModel from '../models/memberModel.js';
import { Op } from 'sequelize';

// Get all members
export const getAllMembers = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, email, phone_number, gender } = req.query;

    // Filters
    const filters = { deleted: false };

    if (name) {
      filters.name = { [Op.iLike]: `%${name}%` }; // Case-insensitive partial match
    }

    if (email) {
      filters.email = { [Op.iLike]: `%${email}%` };
    }

    if (phone_number) {
      filters.phone_number = { [Op.iLike]: `%${phone_number}%` };
    }

    if (gender) {
      filters.gender = gender; // Exact match for gender
    }

    // Pagination
    const offset = (page - 1) * limit; // Calculate offset
    const members = await memberModel.findAndCountAll({
      where: filters,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
    });

    res.status(200).json({
      total: members.count,
      page: parseInt(page, 10),
      pages: Math.ceil(members.count / limit),
      limit: parseInt(limit, 10),
      data: members.rows,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a single member by ID
export const getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await memberModel.findByPk(id);
    if (!member || memberModel.deleted) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new member

export const createMember = async (req, res) => {
  const { created_by } = req.body;

  try {
    // Check if the created_by user exists
    // const user = await User.findByPk(created_by);
    // if (!user) {
    //   return res.status(400).json({ error: 'Invalid created_by: User does not exist' });
    // }

    // Create the member
    const newMember = await memberModel.create(req.body);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update an existing member
export const updateMember = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the member by ID
      const member = await memberModel.findOne({
        where: { id, active: true, blocked: false, deleted: false },
      });
  
      // If member doesn't exist or conditions are not met
      if (!member) {
        return res.status(404).json({ message: 'Member not found or conditions not met' });
      }
  
      // Update the member
      const updatedMember = await member.update(req.body);
  
      res.status(200).json(updatedMember);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

// PATCH /api/v1/users/:id/block
export const blockMember = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the member by ID, ensure it is not deleted
      const member = await memberModel.findOne({
        where: { id, deleted: false },
      });
  
      // If the member doesn't exist or is already deleted
      if (!member) {
        return res.status(404).json({ message: 'Member not found or already deleted' });
      }
  
      // Update the member's blocked status to true
      await member.update({ blocked: true });
  
      res.status(200).json({
        message: 'Member successfully blocked',
        member,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

// Delete a member (soft delete by setting 'deleted' to true)
export const deleteMember = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the member by ID and ensure it is not already deleted
      const member = await memberModel.findOne({
        where: { id, deleted: false },
      });
  
      // If the member doesn't exist or is already deleted
      if (!member) {
        return res.status(404).json({ message: 'Member not found or already deleted' });
      }
  
      // Soft delete the member by updating the 'deleted' field
      await member.update({ deleted: true });
  
      res.status(200).json({
        message: 'Member deleted successfully',
        member,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const unblockMember = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the member by ID and ensure it exists and is currently blocked
      const member = await memberModel.findOne({
        where: { id, blocked: true, deleted: false },
      });
  
      // If the member doesn't exist or is not blocked
      if (!member) {
        return res.status(404).json({ message: 'Member not found or not blocked' });
      }
  
      // Update the member's blocked status to false
      await member.update({ blocked: false });
  
      res.status(200).json({
        message: 'Member successfully unblocked',
        member,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  