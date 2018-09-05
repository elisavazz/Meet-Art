const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
router.use(fileUpload());
const fs = require("fs");
const Events = require("../models/Events");
const User = require("../models/User");

const Company = require("../models/Company");

router.get("/dashboard", (req, res) => {
    if (req.user === undefined) {
        console.log("UNDEFINED");
        res.redirect("auth/signup");
    } else if (req.user.email === undefined && req.user.collection.collectionName === "users") {
        console.log(req.user.collection.collectionName);
        res.render("create/create-user", { user: req.user });
    } else if (req.user.email === undefined && req.user.collection.collectionName === "companies") {
        console.log(req.user.collection.collectionName);
        res.render("create/create-company", { user: req.user });
    } else {
        res.render("dashboard");
    }
});

// res.render("dashboard");

router.post("/dashboard/attend", (req, res) => {
    //WE NEED TO RETRIEVE ID OF THE EVENT CLICKED AND ID OF THE USER
    const { _id } = req.body;
    let user = req.user._id;
    console.log(typeOf.user);
    Events.findById({ _id: _id }, function(err, event) {
        const { attendees } = event;
        if (err) throw err;
        if (!attendees.includes(user)) {
            console.log(typeOf.attendees);
            console.log("FREIER WEG");
        } else {
            console.log("you are already attending");
        }

        // Events.findByIdAndUpdate(
        // 	{ _id: _id },
        // 	{
        // 		$push: { attendees: user.id }
        // 	},
        // 	{ new: true },
        // 	function(err, Event) {
        // 		if (err) throw err;

        // 		res.redirect('/dashboard');
        // 	}
        // );
    });

    // Events.findByIdAndUpdate(
    // 	{ _id: _id },
    // 	{
    // 		$push: { attendees: user.id }
    // 	},
    // 	{ new: true },
    // 	function(err, Event) {
    // 		if (err) throw err;

    // 		res.redirect('/dashboard');
    // 	}
    // );
    //
});

module.exports = router;
