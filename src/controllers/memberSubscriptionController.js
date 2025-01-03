import memberSubscriptionModel from "../models/memberSubscriptionModel.js";



export const createSubscription = async (req, res) => {
    const { club_id, name, category, price, billing_cycle, description, active } = req.body;
    try {
      const subscription = await memberSubscriptionModel.create({
        club_id,
        name,
        category,
        price,
        billing_cycle,
        description,
        active,
      });
      res.status(201).json(subscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

//   export const getAllSubscriptions = async (req, res) => {
//     try {
//       const subscriptions = await memberSubscriptionModel.findAll({
//         where: { active: true },
//         order: [['created_at', 'DESC']],
//       });
//       res.status(200).json(subscriptions);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };

export const getAllSubscriptions = async (req, res) => {
    try {
      const subscriptions = await memberSubscriptionModel.findAll({
        where: {
          active: true,
          deleted: false,
        },
        order: [['created_at', 'DESC']],
      });
      res.status(200).json(subscriptions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  export const getSubscriptionById = async (req, res) => {
    const { id } = req.params;
    try {
      const subscription = await memberSubscriptionModel.findByPk(id);
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
      res.status(200).json(subscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const updateSubscription = async (req, res) => {
    const { id } = req.params;
    const { club_id, name, category, price, billing_cycle, description, active } = req.body;
  
    try {
      // Find the subscription by ID
      const subscription = await memberSubscriptionModel.findByPk(id);
  
      // Check if the subscription exists and is active
      if (!subscription || !subscription.active) {
        return res.status(404).json({ error: 'Subscription not found or is inactive' });
      }
  
      // Update the subscription
      const updatedSubscription = await subscription.update({
        club_id,
        name,
        category,
        price,
        billing_cycle,
        description,
        active,
      });
  
      res.status(200).json(updatedSubscription);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


  export const deleteSubscription = async (req, res) => {
    const { id } = req.params;
  
    // Validate id
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid or missing subscription ID' });
    }
  
    try {
      // Find the subscription by ID
      const subscription = await memberSubscriptionModel.findByPk(id);
  
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
  
      // Set the subscription as deleted
      await memberSubscriptionModel.update(
        {
          deleted: true,
          updated_at: new Date(),
        },
        {
          where: { id }, // Specify which row to update
        }
      );
  
      res.status(200).json({
        message: 'Subscription marked as deleted successfully',
        subscription: { ...subscription.toJSON(), deleted: true }, // Return updated subscription
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  export const getAllInactiveSubscriptions = async (req, res) => {
    console.log('Inside getAllInactiveSubscriptions controller');
    try {
      const subscriptions = await memberSubscriptionModel.findAll({
        where: {
          active: false,
          deleted: false,
        },
        order: [['created_at', 'DESC']],
      });
      res.status(200).json(subscriptions);
    } catch (error) {
      console.error('Error in getAllInactiveSubscriptions:', error.message);
      res.status(500).json({ error: error.message });
    }
  };


  
  
      
