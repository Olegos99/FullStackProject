const SubscriptionBLLPath = '../BLL/MembersBLL.js';

const expess = require('express');
const MembersBLL = require(SubscriptionBLLPath);

const Router = expess.Router();

//get all memebers
Router.get('/',async (req,res) => {
    try {
        const Items = await MembersBLL.GetAllMembers();
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
        const result = await MembersBLL.PostNewMember(Item);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

// Update an existing Movie
Router.put('/:id', async (req, res) => {
    try {
        const response = await MembersBLL.UpdateMemberById(req.params.id, req.body);
        res.send(response);
    } catch (error) {
        res.send(error)
    }
})

// Delete an existing Movie
Router.delete('/:id', async (req, res) => {
    try {
        const response = await MembersBLL.DeleteMemberByID(req.params.id)
        res.send(response)
    } catch (error) {
        res.send(error)
    }
})

module.exports = Router;

