
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
        // res.json(newUser);
        res.redirect('/userView');

    }

    catch (error) {
        console.error(error);
        res.status(500).send('Error saving user data');
    }
};


const updateUser = async (req, res) => {
    res.json('updateUser ');
}

const updateSms = async (req, res) => {

    const id = req.params.id;
    const { sender, message } = req.body;
    // console.log(id);
    const user = await User.findOne({ _id: id });
    console.log("Single User: ", user.sms);

    user.sms.push({ sender: sender, msg: message });
    // Save the updated user document
    const updated_user = await user.save();

    // console.log("Updated User: ", updated_user);


    if (updated_user) {
        res.json('updated Sms');
    }

    else {
        res.json('Not updated');
    }


}
const updateGallery = async (req, res) => {
    const id = req.params.id;
    const { image_path } = req.body;
    const user = await User.findOne({ _id: id });

    user.gallery.push({ image_path: image_path });
    // Save the updated user document
    const updated_user = await user.save();

    // console.log("Updated User: ", updated_user);


    if (updated_user) {
        res.json('updated Image_path');
    }

    else {
        res.json('Not updated');
    }
}
const updateLocation = async (req, res) => {


    const id = req.params.id;
    const { longitude, latitude } = req.body;
    console.log(longitude, latitude);
    const user = await User.findOne({ _id: id });

    user.location.push({ coordinate: { longitude: longitude, latitude: latitude } });

    // Save the updated user document
    const updated_user = await user.save();

    if (updated_user) {
        res.json('updated Location');
    }

    else {
        res.json('Not updated');
    }

}

module.exports = { userView, postUser, updateUser, updateSms, updateGallery, updateLocation }

