const jf = require('jsonfile');

const getPremissionsJSON = () => {
    return new Promise((resolve, reject) => {
        jf.readFile(__dirname + "/../LocalData/Premissions.json", (err, data) => {
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

const setPremissionsJSON = (obj) => {
    return new Promise((resolve, reject) => {
        jf.writeFile(__dirname + "/../LocalData/Premissions.json", obj, (err) => {
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
    getPremissionsJSON,
    setPremissionsJSON
}