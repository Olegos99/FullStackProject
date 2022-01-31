const UsersBLLPath = '../BLL/UsersBLL.js';

const expess = require('express');
const UsersBLL = require(UsersBLLPath);

const Router = expess.Router();

//get all users
Router.get('/',async (req,res) => {
    try {
        const Items = await UsersBLL.GetAllUsers();
        res.send(Items);
    } catch (error) {
        res.send(error);
    }
});

//check user by username and password
Router.get('/:username/:password',async (req,res) => {
    try {
        const Items = await UsersBLL.CheckUserByUsernameAndPassword(req.params.username, req.params.password);
        res.send(Items);
    } catch (error) {
        res.send(error);
    }
});

//check user by username and password
Router.get('/:id',async (req,res) => {
    try {
        const Items = await UsersBLL.GetUsersPremissions(req.params.id);
        res.send(Items);
    } catch (error) {
        res.send(error);
    }
});

//Post new Member
Router.post('/', async (req, res) => 
{
    try {
        const Item = req.body;  
        const result = await UsersBLL.PostNewUser(Item);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

// Update an existing Movie
Router.put('/:id', async (req, res) => {
    try {
        const response = await UsersBLL.UpdateUserById(req.params.id, req.body);
        res.send(response);
    } catch (error) {
        res.send(error)
    }
})

// Delete an existing Movie
Router.delete('/:id', async (req, res) => {
    try {
        const response = await UsersBLL.DeleteUserByID(req.params.id)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})


module.exports = Router;