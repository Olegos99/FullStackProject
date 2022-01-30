const mongoose = require('mongoose');

const DBConnectionPath = "mongodb+srv://Olegos:<pw>@learningcluster.yuefy.mongodb.net/SubscriptionsDB";

const ConnectSubscriptionsDB = async() => {
    const url = DBConnectionPath;
    const options ={
        useNewUrlParser : true,
        useUnifiedTopology : true
    };

    const data = await mongoose.connect(url,options);
};

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error to Subscriptions DB: "));
db.once("open", function () {
  console.log("Subscriptions DB Connected successfully");
});

module.exports = {
    ConnectSubscriptionsDB
}