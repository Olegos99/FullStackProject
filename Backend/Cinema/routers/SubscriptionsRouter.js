const expess = require('express');
const Router = expess.Router();

const Axios = require('axios');

const SubscriptionsUrl = 'http://localhost:8000/api/subscriptions/';


Router.get('/',async (req,res) => {
    try {
        const Items = await Axios.get(`${SubscriptionsUrl}`);
        res.send(Items.data);
    } catch (error) {
        res.send(error);
    }
});

Router.get('/:id',async (req,res) => {
    try {
        const Items = await Axios.get(`${SubscriptionsUrl}${req.params.id}`);
        res.send(Items.data);
    } catch (error) {
        res.send(error);
    }
});

Router.post('/', async (req, res) => 
{
    try {
        const Item = req.body;  
        const result = await Axios.post(SubscriptionsUrl, Item);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});


Router.put('/:id', async (req, res) => {
    try {
        const response = await  Axios.put(`${SubscriptionsUrl}${req.params.id}`, req.body);
        res.send(response);
    } catch (error) {
        res.send(error)
    }
})

Router.delete('/:id', async (req, res) => {
    try {
        const response = await Axios.delete(`${SubscriptionsUrl}${req.params.id}`);
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})


module.exports = Router;