(function() {
    const bcrypt = require("bcrypt");
    const config = require("../config");
    const jwt = require("jsonwebtoken");
    const mongo = require("mongodb");
    module.exports = blockchainApi;

    function blockchainApi(app, express, db){
        let apiRouter = express.Router();

        apiRouter.put("/amount/add", addAmount);
        apiRouter.put("account/add", addAccount);

        return apiRouter;

        function addAmount(req, res){
            try {
                let email = req.email;
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

        function addAccount(req, res){
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
    }
})();