(function () {
    let express = require("express");
    let cors = require("cors");
    let jwt = require("jsonwebtoken");
    let bodyParser = require("body-parser");
    let mongoClient = require("mongodb").MongoClient;
    let path = require("path");
    let assert = require("assert");
    let morgan = require("morgan");
    let config = require("./config.js");

    let app = express();
    let dbHostUrl = "mongodb://" + config.server + ":" + config.db_port + "/";

    app.use(cors());
    app.use(handleCORSRequests);
    app.use(morgan("common"));
    app.use(
        bodyParser.urlencoded({
            extended: true,
        })
    );
    app.use(bodyParser.json());

    mongoClient.connect(
        dbHostUrl + config.db_name,
        { useUnifiedTopology: true },
        runApp
    );

    server = app.listen(config.port);
    console.log("Server starting at http://localhost:" + config.port);

    process.on("SIGINT", killProcess);

    // add header parameters to every request object
    function handleCORSRequests(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With, content-type, Authorization"
        );
        next();
    }

    // handle onExit interrupt
    function killProcess() {
        console.log(".");
        console.log("[success] stopping Node.js server.");
        process.exit();
    }

    function runApp(err, client) {
        assert.strictEqual(
            null,
            err,
            "[failed] establishing connection to mongodb"
        );
        console.log("MongoDB Connected");
        db = client.db(config.db_name);
        db.collection("helpdid").createIndex({ location: "2dsphere" });
        db.collection("helpreqs").createIndex({ location: "2dsphere" });

        let userApi = require("./routes/api.user.js")(app, express, db);
        let helpApi = require("./routes/api.help.js")(app, express, db);
        let blockchainApi = require("./routes/api.blockchain.js")(
            app,
            express,
            db
        );

        app.use("/", userApi);
        app.use("/", helpApi);
        app.use("/", blockchainApi);
    }

    // auth interceptor
    app.use(authInterceptor);

    function authInterceptor(req, res, next) {
        var token = req.headers["authorization"];
        console.log(req.path);
        var _ = require("underscore"),
            nonSecurePaths = [
                "/user/signup",
                "/user/login",
                "/user/password",
                "/user/signup/",
                "/user/login/",
                "/user/password/",
                "/help/around",
                "/help/helpedaround",
                "/help/around/",
                "/help/helpedaround/",
            ];
        // ignore paths that dont require auth
        if (_.contains(nonSecurePaths, req.path)) return next();
        // decode token
        if (token) {
            // verifies secret and checks exp
            var token = req.headers["authorization"].split(" ")[1];
            jwt.verify(token, config.sessionJwtKey, verifyJwt);
        } else {
            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: "No token provided.",
            });
        }
        function verifyJwt(err, decoded) {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Failed to authenticate.",
                    error: err,
                });
            } else {
                req.email = decoded.email;
                db.collection("user").findOne(
                    {
                        email: decoded.email,
                    },
                    function (err, obj) {
                        if (err) {
                            return res.status(401).send({
                                success: false,
                                message: "failed to authenticate token.",
                            });
                        } else if (!obj) {
                            return res.status(401).send({
                                success: false,
                                message: "failed to authenticate token.",
                            });
                        } else {
                            next();
                        }
                    }
                );
            }
        }
    }
})();
