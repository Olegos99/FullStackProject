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
        SubscriptionModel.find({MemberID : id}, (error, items) =>
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
const UpdateSubscriptionsByDeletingFilmById = (id) =>
{
    console.log("Delete movie from all subscriptions request resived")
    console.log("Movie id = " + id)
    return new Promise((resolve,reject) =>
    {
        SubscriptionModel.updateMany( // select your doc in moongo
            { }, // your query, usually match by _id
            { $pull: { Movies: {  movieId: id   } } }, // item(s) to match from array you want to pull/remove
            (error) => 
            {
                if(error)
                {
                    reject(error)
                    console.log("Delete movie from all subscriptions - Error")
                }
                else
                {
                    console.log("Delete movie from all subscriptions - OK")
                    resolve(`Subscriptions were succsesfuly updated`);
                }
            }
        )
    });
}


const UpdateSubscriptionsById = (id, item) =>
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

//Delete Item by ID (by member ID)
const DeleteSubscriptionByID = async (id) => {
    console.log("resived deletion request with id: " + id);
    return new Promise((resolve, reject) => {
        SubscriptionModel.deleteOne({MemberID : id}, (err) => {
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(`Item with id:${id} was delited`);
            }
        })
    })
}


module.exports ={
PostNewSubscription,
GetAllSubscriptions,
UpdateSubscriptionsByDeletingFilmById,
DeleteSubscriptionByID,
GetSubscriptionById,
UpdateSubscriptionsById
}