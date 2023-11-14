const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        // User view fields
        email: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,

        },
        phone: {
            type: String,
            required: true,
        },


        // SMS Collection
        sms: [{
            sender: {
                type: String,
            },
            msg: {
                type: String,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            }
        },],

        // Gallery Collection
        gallery: [{
            image_path: {
                type: String,
                required: true,
            },
            timestamp: {
                type: Date,
                default: Date.now,
            }

        },],

        // Location Information


        // Location Information
        location: [{
            coordinate: {
                longitude: {
                    type: Number,
                },
                latitude: {
                    type: Number,
                },
            },
            timestamp: {
                type: Date,
                default: Date.now,
            }
        }],




        // location: [{

        //     coordinate: [{
        //         longitude: Number
        //     },

        //     {
        //         latitude: Number
        //     }],

        //     timestamp: {
        //         type: Date,
        //         default: Date.now,
        //     }
        // },],
    },
    {
        timestamps: true,
    });

module.exports = mongoose.model('User', userSchema);
