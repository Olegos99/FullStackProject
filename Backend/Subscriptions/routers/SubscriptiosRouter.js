const SubscriptionBLLPath = '../BLL/SubscriptionsBLL.js';

const expess = require('express');
const SubscriptionBLL = require(SubscriptionBLLPath);

const Router = expess.Router();
//get all subscriptions
Router.get('/',async (req,res) => {
    try {
        const Items = await SubscriptionBLL.GetAllSubscriptions();
        res.send(Items);
    } catch (error) {
        res.send(error);
    }
});

Router.get('/:id',async (req,res) => {
    try {
        const Items = await SubscriptionBLL.GetSubscriptionById(req.params.id);
        res.send(Items);
    } catch (error) {
        res.send(error);
    }
});



//Post new Movie
Router.post('/', async (req, res) => 
{
    try {
        const Item = req.body;  
        const result = await SubscriptionBLL.PostNewSubscription(Item);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

// Update an existing Movie
Router.put('/:id', async (req, res) => {
    try {
        const response = await SubscriptionBLL.UpdateSubscriptionById(req.params.id, req.body);
        res.send(response);
    } catch (error) {
        res.send(error)
    }
})

// Delete an existing Movie
Router.delete('/:id', async (req, res) => {
    try {
        const response = await SubscriptionBLL.DeleteSubscriptionByID(req.params.id)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})
module.exports = Router;

