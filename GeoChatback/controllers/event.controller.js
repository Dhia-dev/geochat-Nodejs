

const {Event} = require('../models/event.model')




const createEvent = async(req,res)=>{


    const event = new Event({
 
     ...req.body
        
    });



 if (req.file) {

   event.image = req.file.filename;
}


await event.save();

res.send(event)




}




const getAllEvents = async(req,res)=>{


   const events = await Event.find()


   res.status(200).send(events)




}


module.exports = { 
     createEvent,getAllEvents
}