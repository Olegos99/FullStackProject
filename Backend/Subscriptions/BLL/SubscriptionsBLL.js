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

const GetSubscriptionById = (id) => {
    return new Promise ((resolve,reject) =>
    {
        SubscriptionModel.find({_id : id}, (error, items) =>
        {
            if(error)
             reject(error)
            else 
            resolve(items)
        });
    });
}


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


module.exports ={
PostNewSubscription,
GetAllSubscriptions,
UpdateSubscriptionById,
DeleteSubscriptionByID,
GetSubscriptionById
}