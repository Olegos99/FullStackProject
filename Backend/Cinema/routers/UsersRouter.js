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

//check user existance
Router.get('/username:username',async (req,res) => {
    try {
        const Items = await UsersBLL.CheckNewUserExistance(req.params.username);
        res.send(Items);
    } catch (error) {
        res.send(error);
    }
});

//get user premissions and other info by id
Router.get('/:id',async (req,res) => {
    try {
        const Items = await UsersBLL.GetUserInfo(req.params.id);
        res.send(Items);
    } catch (error) {
        res.send(error);
    }
});


Router.post('/', async (req, res) => 
{
    try {
        const Item = req.body;  
        const result = await UsersBLL.PostNewUser(Item);
        const result2 = await UsersBLL.SetUserInfo(result.id, Item);
        res.send(result2);
    } catch (error) {
        res.send(error);
    }
});


Router.put('/newpassword:id',async (req,res) => {
    try {
        const Item = await UsersBLL.UpdateUserById(req.params.id);
        res.send(Item);
    } catch (error) {
        res.send(error);
    }
});


Router.put('/:id', async (req, res) => {
    try {
        const Item = req.body;  
        const response = await UsersBLL.UpdateUserById(req.params.id, Item);
        const response2 = await UsersBLL.SetUserInfo(req.params.id, Item);
        res.send(response2);
    } catch (error) {
        res.send(error)
    }
})

Router.delete('/:id', async (req, res) => {
    try {
        const response = await UsersBLL.DeleteUserByID(req.params.id)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})


module.exports = Router;