const MoviesBLLPath = '../BLL/MoviesBLL.js';

const expess = require('express');
const MoviesBLL = require(MoviesBLLPath);

const Router = expess.Router();

//get all movies
Router.get('/',async (req,res) => {
    try {
        const Items = await MoviesBLL.GetAllMovies();
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
        const result = await MoviesBLL.PostNewMovie(Item);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

// Update an existing Movie
Router.put('/:id', async (req, res) => {
    try {
        const response = await MoviesBLL.UpdateMovieById(req.params.id, req.body);
        res.send(response);
    } catch (error) {
        res.send(error)
    }
})

// Delete an existing Movie
Router.delete('/:id', async (req, res) => {
    try {
        const response = await MoviesBLL.DeleteMovieByID(req.params.id)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

module.exports = Router;

