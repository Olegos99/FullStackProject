const SubscriptionBLLPath = '../BLL/SubscriptionBLL.js';

const expess = require('express');
const MovieModel = require('../DBmodels/Movie');
const SubscriptionBLL = require(SubscriptionBLLPath);

const Router = expess.Router();

//get all movies
Router.get('/Movies',async (req,res) => {
    try {
        const Items = await SubscriptionBLL.GetAllMovies();
        res.send(Items);
    } catch (error) {
        res.send(error);
    }
});

//get all memebers
Router.get('/Members',async (req,res) => {
    try {
        const Items = await SubscriptionBLL.GetAllMembers();
        res.send(Items);
    } catch (error) {
        res.send(error);
    }
});

//get all subscriptions
Router.get('/Subscriptions',async (req,res) => {
    try {
        const Items = await SubscriptionBLL.GetAllSubscriptions();
        res.send(Items);
    } catch (error) {
        res.send(error);
    }
});

//Post new Movie
Router.post('/Movie', async (req, res) => 
{
    try {
        const Item = req.body;  
        const result = await SubscriptionBLL.PostNewMovie(Item);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

//Post new Member
Router.post('/Member', async (req, res) => 
{
    try {
        const Item = req.body;  
        const result = await SubscriptionBLL.PostNewMember(Item);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

// Update an existing Movie
Router.put('/:id', async (req, res) => {
    try {
        const response = await SubscriptionBLL.UpdateMovieById(req.params.id, req.body);
        res.send(response);
    } catch (error) {
        res.send(error)
    }
})

// Delete an existing Movie
Router.delete('/:id', async (req, res) => {
    try {
        const response = await SubscriptionBLL.DeleteMovieByID(req.params.id)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})





module.exports = Router;

