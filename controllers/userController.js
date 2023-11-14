
const asyncHandler = require('express-async-handler');
//userModel import using require() method
const User = require('../models/userModel');

const userView = async (req, res) => {
    // Render your view, if needed
    res.render('user');
}



// Controller for handling form submission
const postUser = async (req, res) => {
    try {
        // Extract data from the request body

        // const dataa = {
        //     email,
        //     password,
        //     name,
        //     phone,
        //     sender,
        //     msg,
        //     longitude,
        //     latitude
        // } = req.body;

        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name;
        const phone = req.body.phone;

        const sender = req.body.sender;
        const msg = req.body.message;

        const image_path = req.body.image_path;

        const longitude = req.body.longitude;
        const latitude = req.body.latitude;


        console.log(longitude + "   " + latitude);



        // Create a new user using the User model and request body
        const newUser = new User({
            email,
            password,
            name,
            phone,

            sms: [{
                sender: sender,
                msg: msg
            }],

            gallery: [{
                image_path: image_path
            },
            ],

            location: [
                {
                    coordinate: { longitude: longitude, latitude: latitude, },
                },
            ],



        });

        // Save the user to the database
        await newUser.save();
        console.log(newUser);

        // Respond as JSON or redirect as needed
        res.json(newUser);
        res.redirect('/userView');

    }

    catch (error) {
        console.error(error);
        res.status(500).send('Error saving user data');
    }
};


const updateUser = (req, res) => {
    res.json('updateUser ');



}

const updateSms = (req, res) => {
    res.json('updateSms ');

}
const updateGallery = (req, res) => {
    res.json('updateGallery ');

}
const updateLocation = (req, res) => {
    res.json('updateLocation ');

}

module.exports = { userView, postUser, updateUser, updateSms, updateGallery, updateLocation }

