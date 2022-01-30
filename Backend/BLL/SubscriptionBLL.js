const pathToMemberModel = '../DBmodels/Member';
// FullStackProject\full_stack_project_for_users_and_subscriptiosn_managment\Backend\DBmodels\Member.js
const pathToMovieModel = '../DBmodels/Movie';
const pathToSubscriptionModel = '../DBmodels/Subscription';

const MemberModel = require(pathToMemberModel);
const MovieModel = require(pathToMovieModel);
const SubscriptionModel = require(pathToSubscriptionModel);

//Get All Items
const GetAllMovies = () => {
    return new Promise ((resolve,reject) =>
    {
        MovieModel.find({}, (error, items) =>
        {
            if(error)
             reject(error)
            else 
            resolve(items)
        });
    });
}

const GetAllMembers = () => {
    return new Promise ((resolve,reject) =>
    {
        MemberModel.find({}, (error, items) =>
        {
            if(error)
             reject(error)
            else 
            resolve(items)
        });
    });
}

const GetAllSubscriptions = () => {
    return new Promise ((resolve,reject) =>
    {
        SubscriptionModel.find({}, (error, items) =>
        {
            if(error)
             reject(error)
            else 
            resolve(items)
        });
    });
}
//Get All Items

//Post Item (Add new Item)
const PostNewMovie = (RecivedItem) =>
{
    return new Promise((resolve,reject) =>
    {
        const NewMovie = new MovieModel(RecivedItem);
        NewMovie.save((error) => 
        {
            if(error)
            reject(error)
            else
            resolve(`${NewMovie} item was succsesfuly saved`);
        });
    });
}

//Post Item (Add new Item)
const PostNewMember = (RecivedItem) =>
{
    return new Promise((resolve,reject) =>
    {
        const NewMember = new MemberModel(RecivedItem);
        NewMember.save((error) => 
        {
            if(error)
            reject(error)
            else
            resolve(`${NewMember} item was succsesfuly saved`);
        });
    });
}

//Put Item by ID (Update existing)
const UpdateMovieById = (id, item) =>
{
    return new Promise((resolve,reject) =>
    {
        MovieModel.findByIdAndUpdate(id, item,(error) => 
        {
            if(error)
            reject(error)
            else
            resolve(`Movie with id ${id} was succsesfuly updated`);
        });
    });
}

//Delete Item by ID
const DeleteMovieByID = async (id) => {
    return new Promise((resolve, reject) => {
        MovieModel.findByIdAndDelete(id, (err) => {
            if(err)
            reject(err);
            else
            resolve(`Item with id:${id} was delited`);
        })
    })
}





// //GetItemByID
// const GetItemById = (id) =>
// {
//     return new Promise ((resolve,reject) =>
//     {
//         ItemModel.findById(id,(error, item) =>
//         {
//             if(error)
//             reject(error);
//             else
//             resolve(item);
//         });
//     });
// }

// //Post Item (Add new Item)
// const PostNewItem = (RecivedItem) =>
// {
//     return new Promise((resolve,reject) =>
//     {
//         const NewItem = new ItemModel(RecivedItem);
//         NewItem.save((error) => 
//         {
//             if(error)
//             reject(error)
//             else
//             resolve(`${NewItem} item was succsesfuly saved`);
//         });
//     });
// }

// //Put Item by ID (Update existing)
// const UpdateItemById = (id, item) =>
// {
//     return new Promise((resolve,reject) =>
//     {
//         ItemModel.findByIdAndUpdate(id, item,(error) => 
//         {
//             if(error)
//             reject(error)
//             else
//             resolve(`Item with id ${id} was succsesfuly updated`);
//         });
//     });
// }

// //Delete Item by ID
// const DeleteItemByID = async (id) => {
//     return new Promise((resolve, reject) => {
//         ItemModel.findByIdAndDelete(id, (err) => {
//             if(err)
//             reject(err);
//             else
//             resolve(`Item with id:${id} was delited`);
//         })
//     })
// }

module.exports ={
GetAllMovies,
GetAllSubscriptions,
GetAllMembers,
PostNewMovie,
UpdateMovieById,
DeleteMovieByID,
PostNewMember
}