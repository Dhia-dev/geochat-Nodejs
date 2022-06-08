const { query } = require('express');

const {Notification} = require('../models/notification.model')




const addNotification = async(req,res)=>{


    const notification = new Notification({
 
     ...req.body
        
    });


await notification.save();

res.send(notification)




}




const list = async(req,res)=>{


   const notifications = await Notification.find({userId:req.params.id}).populate('creator')


   res.status(200).send(notifications)




}




module.exports = { 
   
    addNotification,list
}