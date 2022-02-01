const expess = require('express');
const Router = expess.Router();

const Axios = require('axios');

const MembersUrl = 'http://localhost:8000/api/members/';


Router.get('/',async (req,res) => {
    try {
        const Items = await Axios.get(`${MembersUrl}`);
        res.send(Items.data);
    } catch (error) {
        res.send(error);
    }
});

Router.get('/:id',async (req,res) => {
    try {
        const Items = await Axios.get(`${MembersUrl}${req.params.id}`);
        res.send(Items.data);
    } catch (error) {
        res.send(error);
    }
});

Router.post('/', async (req, res) => 
{
    try {
        const Item = req.body;  
        const result = await Axios.post(MembersUrl, Item);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});


Router.put('/:id', async (req, res) => {
    try {
        const response = await  Axios.put(`${MembersUrl}${req.params.id}`, req.body);
        res.send(response);
    } catch (error) {
        res.send(error)
    }
})

Router.delete('/:id', async (req, res) => {
    try {
        const response = await Axios.delete(`${MembersUrl}${req.params.id}`);
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})


module.exports = Router;