(function () {
    const bcrypt = require("bcrypt");
    const config = require("../config");
    const jwt = require("jsonwebtoken");
    const mongo = require("mongodb");
    module.exports = blockchainApi;

    function blockchainApi(app, express, db) {
        let apiRouter = express.Router();

        apiRouter.put("/amount/add", addAmount);
        apiRouter.put("account/add", addAccount);
        apiRouter.put("/withdraw/request", withdrawRequest);
        apiRouter.get("/get/withdraw", getAllWithdrawRequest);
        apiRouter.put("/withdraw", withdrawToPhilan);
        apiRouter.post("/reward/ask", askReward);
        apiRouter.get("/get/pending", getPendingRewards);
        apiRouter.put("/give/rewards", giveRewards);

        return apiRouter;

        function addAmount(req, res) {
            try {
                let email = req.email;
                console.log("Print : ", email);
                db.collection("user").updateOne(
                    {
                        email: email,
                    },
                    {
                        $inc: {
                            amount: req.body.amount,
                        },
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

        function addAccount(req, res) {
            try {
                let email = req.body.email;
                db.collection("user").updateOne(
                    {
                        email: email,
                    },
                    {
                        $set: {
                            userAddress: req.body.userAddress,
                        },
                    },
                    (err, docs) => {
                        if (err) {
                            res.status(500).json({ message: "Error occured" });
                        } else {
                            res.status(200).json({ message: "Address added" });
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

        function withdrawRequest(req, res) {
            try {
                let email = req.email;
                db.collection("user").updateOne(
                    {
                        email: email,
                    },
                    {
                        $set: {
                            withdrawRequest: "requested",
                        },
                    },
                    (err, docs) => {
                        if (err) {
                            res.status(500).json({ message: "Error occured" });
                        } else {
                            res.status(200).json({
                                message: "Withdraw requested",
                            });
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

        function getAllWithdrawRequest(req, res) {
            var cursor = db
                .collection("user")
                .find({ withdrawRequest: "requested" });
            var allWithdrawRequest = [];
            cursor.each(processCursor);
            function processCursor(err, doc) {
                if (err) {
                    res.status(500).json({
                        message: "db Error",
                    });
                    return;
                }

                if (doc != null) {
                    allWithdrawRequest.push(doc);
                } else {
                    res.status(200).json({
                        response: allWithdrawRequest,
                    });
                }
            }
        }

        function withdrawToPhilan(req, res) {
            try {
                let email = req.body.email;
                db.collection("user").findOne(
                    {
                        email: email,
                    },
                    (err, docs) => {
                        // console.log(docs);
                        let amountToGive = docs["amount"];
                        db.collection("user").updateOne(
                            {
                                email: email,
                            },
                            {
                                $set: {
                                    amount: 0,
                                    withdrawRequest: "processed",
                                },
                            },
                            (err, doc) => {
                                if (err) {
                                    res.status(500).json({
                                        message: "Error occured",
                                    });
                                } else {
                                    res.status(200).json({
                                        amountToGive: amountToGive,
                                    });
                                }
                            }
                        );
                    }
                );
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "server error" });
                return;
            }
        }

        function askReward(req, res) {
            try {
                let body = req.body;
                let email = req.email;
                console.log("Backend address : ", body.userAddress);
                db.collection("rewardrequest").insertOne(
                    {
                        email: email,
                        status: "pending",
                        rewards: 5,
                        helpdid: body.helpdid,
                        userAddress: body.userAddress,
                    },
                    (err, docs) => {
                        if (err) {
                            res.status(500).json({ message: "Error occured" });
                        } else {
                            db.collection("user").findOne(
                                {
                                    email: email,
                                },
                                (error, doc) => {
                                    if (error) {
                                        res.status(500).json({
                                            message: "Error occured",
                                        });
                                    } else {
                                        res.status(200).json({
                                            status: "pending",
                                            userAddress: doc.userAddress,
                                        });
                                        return;
                                    }
                                }
                            );
                        }
                    }
                );
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "server error" });
                return;
            }
        }

        function getPendingRewards(req, res) {
            var cursor = db
                .collection("rewardrequest")
                .find({ status: "pending" });
            var pendingRewardsResp = [];
            cursor.each(processCursor);
            function processCursor(err, doc) {
                if (err) {
                    res.status(500).json({
                        message: "db Error",
                    });
                    return;
                }

                if (doc != null) {
                    pendingRewardsResp.push(doc);
                } else {
                    res.status(200).json({
                        response: pendingRewardsResp,
                    });
                }
            }
        }

        function giveRewards(req, res) {
            try {
                let email = req.body.email;
                db.collection("rewardrequest").updateOne(
                    {
                        email: email,
                        _id: mongo.ObjectId(req.body.id),
                    },
                    {
                        $set: {
                            status: "rewarded",
                        },
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
    }
})();
