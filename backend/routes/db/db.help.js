let reqhelp = function (db, email, body, callback) {
    // similar except here details mean tree preferences
    db.collection("helpreqs").insertOne(
        {
            email: email,
            label: body.label,
            type: body.type,
            location: {
                type: "Point",
                coordinates: [body.x, body.y],
            },
            details: body.details,
        },
        (err, docs) => {
            if (err) {
                console.log(err);

                return;
            } else {
                callback(docs);
            }
        }
    );
};

let dohelp = function (db, email, body, callback) {
    //
    db.collection("helpdid").insertOne(
        {
            email: email,
            req: body.req,
            label: body.label,
            type: body.type,
            location: {
                type: "Point",
                coordinates: [parseFloat(body.x), parseFloat(body.y)],
            },
            details: body.details,
            verification: {},
        },
        (err, docs) => {
            if (err) {
                console.log(err);
                callback({ message: "server error" });
                return;
            } else {
                callback(docs);
            }
        }
    );
};

let getreqhelp = function (db, x, y, callback) {
    if (x != undefined && y != undefined) {
        db.collection("helpdid")
            .find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [x, y],
                        },
                    },
                },
            })
            .toArray()
            .then((docs) => {
                callback(docs);
            });
    } else {
        db.collection("land")
            .find()
            .toArray()
            .then((docs) => {
                callback(docs);
            });
    }
};

let gethelpedaround = function (db, x, y, callback) {
    if (x != undefined && y != undefined) {
        db.collection("helpdid")
            .find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [x, y],
                        },
                    },
                },
            })
            .toArray()
            .then((docs) => {
                callback(docs);
            });
    } else {
        db.collection("land")
            .find()
            .toArray()
            .then((docs) => {
                callback(docs);
            });
    }
};

module.exports = {
    reqhelp,
    dohelp,
    gethelpedaround,
    getreqhelp,
};
