(function () {
    const express = require("express");

    module.exports = helpApi;
    const dbfunchelp = require("./db/db.help.js");

    function helpApi(app, express, db) {
        let apiRouter = express.Router();

        // Request a help O
        apiRouter.post("/help/request", requesthelp);

        apiRouter.post("/help/do", dohelp);
        // easier call O
        apiRouter.get("/help/around", gethelp);
        apiRouter.get("/help/helpedaround", gethelpedaround);
        apiRouter.get("/help/getbyuser", gethelpsByUser);

        return apiRouter;

        function requesthelp(req, res) {
            try {
                let email = req.email;
                dbfunchelp.reqhelp(db, email, req.body, (docs) => {
                    res.status(200).json({ message: "accepted" });
                    return;
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "server error" });
                return;
            }
        }

        function dohelp(req, res) {
            try {
                let email = req.email;
                dbfunchelp.dohelp(db, email, req.body, (docs) => {
                    res.status(200).json({ message: "accepted" });
                    return;
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "server error" });
                return;
            }
        }

        function gethelp(req, res) {
            try {
                let x = parseFloat(req.query.x);
                let y = parseFloat(req.query.y);
                console.log(x);
                console.log(y);
                dbfunchelp.getreqhelp(db, x, y, (docs) => {
                    res.status(200).json(docs);
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "server error" });
                return;
            }
        }
        function gethelpsByUser(req, res) {
            var cursor = db.collection("helpdid").find({ email: req.email });
            var userhelps = [];
            cursor.each(processCursor);
            function processCursor(err, doc) {
                if (err) {
                    res.status(500).json({
                        message: "db Error",
                    });
                    return;
                }

                if (doc != null) {
                    userhelps.push(doc);
                } else {
                    res.status(200).json({
                        helps: userhelps,
                    });
                }
            }
        }

        function gethelpedaround(req, res) {
            try {
                let x = parseFloat(req.query.x);
                let y = parseFloat(req.query.y);
                console.log(x);
                console.log(y);
                dbfunchelp.gethelpedaround(db, x, y, (docs) => {
                    res.status(200).json(docs);
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({ message: "server error" });
                return;
            }
        }
    }
})();
