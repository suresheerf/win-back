const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title:String,
    notification:{
        type:String,
        required:[true,'Notification must not be empty']
    },
    date: {
        type: Date,
        default: Date.now}
},
{
    toJSON:{virtuals : true},
    toObject:{virtuals : true}
});


const Notification = mongoose.model('Notification',notificationSchema);

module.exports = Notification;