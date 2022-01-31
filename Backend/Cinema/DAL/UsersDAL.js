const jf = require('jsonfile');

const getUsersJSON = () => {
    return new Promise((resolve, reject) => {
        jf.readFile(__dirname + "/../LocalData/Users.json", (err, data) => {
            if (err) {
                reject(err)
                console.log("DAL failed");
            } else {
                resolve(data)
                console.log("DAL worked");
            }
        })
    })
}

const setUsersJSON = (obj) => {
    return new Promise((resolve, reject) => {
        jf.writeFile(__dirname + "/../LocalData/Users.json", obj, (err) => {
            if (err) {
                reject(err)
                console.log("DAL failed Json NOT updated");
            } else {
                resolve(obj)
                console.log("Json updated sucssesfuly!!!");
            }
        })
    })
}

module.exports = {
    getUsersJSON,
    setUsersJSON
}