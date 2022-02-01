const expess = require('express');
const Router = expess.Router();

const Axios = require('axios');

const MoviesUrl = 'http://localhost:8000/api/movies/';


Router.get('/',async (req,res) => {
    try {
        const Items = await Axios.get(`${MoviesUrl}`);
        res.send(Items.data);
    } catch (error) {
        res.send(error);
    }
});

Router.get('/:id',async (req,res) => {
    try {
        const Items = await Axios.get(`${MoviesUrl}${req.params.id}`);
        res.send(Items.data);
    } catch (error) {
        res.send(error);
    }
});

Router.post('/', async (req, res) => 
{
    try {
        const Item = req.body;  
        const result = await Axios.post(MoviesUrl, Item);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});


Router.put('/:id', async (req, res) => {
    try {
        const response = await  Axios.put(`${MoviesUrl}${req.params.id}`, req.body);
        res.send(response);
    } catch (error) {
        res.send(error)
    }
})

Router.delete('/:id', async (req, res) => {
    try {
        const response = await Axios.delete(`${MoviesUrl}${req.params.id}`);
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})


module.exports = Router;