import { User } from '../../db/models/User.js';

export async function getAllUsers (req, res) {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
