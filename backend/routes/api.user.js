(function () {
    const bcrypt = require("bcrypt");
    const config = require("../config");
    const jwt = require("jsonwebtoken");
    module.exports = userApi;
    const dbfunc = require("./db/db.user.js");

    function userApi(app, express, db) {
        let apiRouter = express.Router();

        apiRouter.post("/user/signup", signup);
        apiRouter.post("/user/login", login);
        apiRouter.delete("/user", deleteuser);
        apiRouter.get("/user", user);
        apiRouter.post("/user/password", password);

        return apiRouter;

        function user(req, res) {
            try {
                console.log(req.email);
                let email = req.email;
                db.collection("user").findOne(
                    {
                        email: email,
                    },
                    (err, docs) => {
                        if (err) {
                            res.status(500).json({ message: "Error occured" });
                        } else {
                            res.status(200).json({ docs });
                            return;
                        }
                    }
                );
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "server error" });
                return;
            }
        }

        function deleteuser(req, res) {
            try {
                let email = req.body.email;

                dbfunc.deleteUser(db, email, (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "server error" });
                        return;
                    } else {
                        res.status(200).json({ message: "admin deleted" });
                        return;
                    }
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "server error" });
                return;
            }
        }

        function signup(req, res) {
            try {
                let email = req.body.email;
                let password = req.body.password;
                let encryptpwd = bcrypt.hashSync(password, 10);

                dbfunc.createUser(db, email, encryptpwd, (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "server error" });
                        return;
                    } else {
                        res.status(200).json({ message: "admin created" });
                        return;
                    }
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "server error" });
                return;
            }
        }

        function login(req, res) {
            try {
                var email = req.body.email;
                var password = req.body.password;

                dbfunc.getUser(db, email, (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "server error" });
                        return;
                    } else {
                        if (docs) {
                            let isValidated = bcrypt.compareSync(
                                password,
                                docs.password
                            );

                            if (isValidated) {
                                var apiExpiryTime = config.sessionJwtExpiry;

                                //generate jwt token
                                var token = jwt.sign(
                                    {
                                        email: email,
                                    },
                                    config.sessionJwtKey,
                                    {
                                        expiresIn: apiExpiryTime,
                                    }
                                );

                                let responseJson = {};
                                responseJson.token = token;
                                responseJson.email = email;
                                res.status(200).json(responseJson);
                            } else {
                                res.status(400).json({
                                    message: "validation failed",
                                });
                            }
                        }
                    }
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "server error" });
                return;
            }
        }
        function password(req, res) {
            try {
                let email = req.body.email;
                let password = req.body.password;
                let encryptpwd = bcrypt.hashSync(password, 10);
                dbfunc.passwordUser(db, email, encryptpwd, (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.status(500).json({ message: "server error" });
                        return;
                    } else {
                        res.status(200).json({
                            message: "admin password changed",
                        });
                        return;
                    }
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "server error" });
                return;
            }
        }
    }
})();
