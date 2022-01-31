const pathToSubscriptionModel = '../DBmodels/Subscription';

const SubscriptionModel = require(pathToSubscriptionModel);


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
const PostNewSubscription = (RecivedItem) =>
{
    return new Promise((resolve,reject) =>
    {
        const NewSubscription = new SubscriptionModel(RecivedItem);
        NewSubscription.save((error) => 
        {
            if(error)
            reject(error)
            else
            resolve(`${NewSubscription} item was succsesfuly saved`);
        });
    });
}

//Put Item by ID (Update existing)
const UpdateSubscriptionById = (id, item) =>
{
    return new Promise((resolve,reject) =>
    {
        SubscriptionModel.findByIdAndUpdate(id, item,(error) => 
        {
            if(error)
            reject(error)
            else
            resolve(`Movie with id ${id} was succsesfuly updated`);
        });
    });
}

//Delete Item by ID
const DeleteSubscriptionByID = async (id) => {
    return new Promise((resolve, reject) => {
        SubscriptionModel.findByIdAndDelete(id, (err) => {
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
PostNewSubscription,
GetAllSubscriptions,
UpdateSubscriptionById,
DeleteSubscriptionByID
}