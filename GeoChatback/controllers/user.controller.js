const { query } = require('express');
const { array } = require('../middleware/storage');

const {User} = require('../models/user.model')
const nodemailer = require('nodemailer')




 const updateProfile =  async(req,res)=>{
  try{


    const {email,name}= req.body

    let user = await User.findOneAndUpdate (
      {},
      {
        $set: {
          name : name
        }

      }
    )
res.send({user});
 
}catch(error){
 console.log(error)
}

}



const sendEmail = async(req,res)=>{

  try {

   var  user1 =  await User.findOne({ email: req.body.email})

    if(user1){

      sendConfirmationEmail(req.body.email)

      res.status(200).send(user1);
  
    }else {

      res.status(404);

    }


}catch(error){


  console.log(error)


}



}


async function sendConfirmationEmail(email) {
    
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alaeddine.aouiti@esprit.tn',
      pass: '172839654172839654@Security.aouiti'
    }
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
      console.log("Server not ready");
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const mailOptions = {
    from: 'alaeddine.aouiti@esprit.tn',
    to: email,
    subject: 'Confirmation de votre email',
    html: "<h3> your validation code  : </h3><h2> 570974</h2>"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}



const register = async(req,res)=>{


    const user = new User({
 
     ...req.body
        
    });



 if (req.file) {

   user.image = req.file.filename;
}


await user.save();

res.json(user)




}

const login = async(req,res)=>{

  

   try{


      const {email,password}= req.body
 

    const user = await User.findOne({email,password})

    if(user){


      res.status(200).send(user)

    }else {


      res.status(404).end()
    }

    console.log(user)



      
   
  
   
}catch(error){


   console.log(error)
}





}


const list = async(req,res)=>{


   const users = await User.find();


   res.status(200).send(users)


}

const getusers = async(req,res)=>{

 const {id} = req.params;

 const v = [];

 const users = await User.find()

    users.forEach(user =>{

        if(user._id != id){

    
          v.push(user);

        }

    })
 

   res.status(200).send(v);


}


const getUserById = async(req,res)=>{

  const { id } = req.params;


  const user = await User.findById(id);




  res.status(200).send(user);

}



const updateUser = async(req,res)=>{

   const user = new User({
 
    
    _id : req.body._id,
 
    name : req.body.name,

    email : req.body.email,

    password : req.body.password,

    image : req.file.filename
 
   });

  
 
   try {
 
    await User.findByIdAndUpdate(req.body._id,user);
 
    res.status(200).send(user)
   
     
   } catch (error) {
     
     console.log(error)
   }
 
 }

 
const changePassword = async (req, res) => {


  const { email, password } = req.body;


  try {

    await User.findOneAndUpdate(

      { email: email },

      {

        $set: {

          password: password

        }

      }

    );

    res.status(200).end()


  } catch (error) {

    console.log(error)

    res.status(404).end()


  }

}

module.exports = { 
     register,login,list,updateUser,getUserById,changePassword,getusers, sendEmail, updateProfile
}