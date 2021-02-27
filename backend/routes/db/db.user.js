let getUser = function (db, email, callback) {
    db.collection("user").findOne({ email: email }, callback);
};

let deleteUser = function (db, email, callback) {
    db.collection("user").deleteOne({ email: email }, callback);
};

let createUser = function (db, email, password, callback) {
    db.collection("user").insertOne(
        {
            email: email,
            password: password,
            investor: false,
            userAddress: "",
            amount: 0,
        },
        callback
    );
};

let passwordUser = function (db, email, password, callback) {
    db.collection("user").updateOne(
        {
            email: email,
        },
        {
            $set: {
                password: password,
            },
        },
        callback
    );
};

module.exports = {
    getUser,
    deleteUser,
    createUser,
    passwordUser,
};
