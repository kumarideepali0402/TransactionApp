
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model")
const accountModel = require("../models/account.model")
const mongoose = require("mongoose")


async function signUpUser(req, res){
    const {name, email, password} = req.body;
    const isAlreadyExist = await  userModel.findOne({email});

    if(isAlreadyExist) {
        return res.status(401).send("User already exist");

    }
    const hashedPassword = await bcrypt.hash(password,10)
    
   
    const user = await userModel.create({
        name,
        email,
        password: hashedPassword
    });


    // Acount creation 
    const acc = await accountModel.create({
        userId: user._id,
        balance: 1+Math.random()*10000
        
        

    })
    console.log("account created");
    console.log(acc);
    

    const token = jwt.sign({
        _id:user._id,
        type : "user"
    },process.env.JWT_SECRET);
    res.cookie("token", token)
    console.log("User registered Successfully");
    
    return res.status(201).json({
        msg : "User registered Successfully",
        user : {
            _id: user._id,
            name : user.name,
            email : user.email,

        }
    })

}
async function signInUser(req, res) {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).send("User doesnt exist please singup");
    } 

    
    isValidUser = await bcrypt.compare(password, user.password)
    if(!isValidUser){
        return res.status(400).send("Wrong Password or mailId");
    }

    const token = jwt.sign({
        _id: user._id,
        type : "user"
    },process.env.JWT_SECRET)

    res.cookie("token", token);
    console.log("User logged in Successfully");
    
    console.log("User logged in Successfully");
    return res.status(201).json({
        msg: "User logged in Successfully",
        user : {
           _id: user._id,
            name : user.name,
            email : user.email,

        }
    })
    
    
}



async function updateUser(req, res){
    const userId = req.user._id;
    const {name, email, currentPassword, newPassword} = req.body;
    const user = await userModel.findById(userId);
    if(!user){
        return  res.send("User not found!")
        
    }

    updateData = {}
    
    if(name){
        updateData.name = name;

    }

    if(email && user.email != email) {
        const emailExist = userModel.findOne({email});
        if(emailExist) {
            return res.status(401).send("Email already in use")
        }
        updateData.email = email;
    }


    if(currentPassword && newPassword){
        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)
        if(!isCurrentPasswordValid){
            return res.status(401).json({msg: "cureent password is incorrect"})
        }

        updateData.password = await bcrypt.hash(newPassword, 10);
    }
    else if ((currentPassword && !newPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ error: "Both current password and new password are required to change password" });
        }


        if(Object.keys(updateData).length === 0){
            res.status(401).json({msg: "no data to update "});
        }

        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData).select("-password")
        return res.status(201).json({
            msg : "Updated uSER Data Successfully..",
            user : {
                _id : updateUser._id,
                name: updateUser.name,
                email: updatedUser.email
            }
        })
}


async function filterUserByName(req, res) {
    const filter = req.query.filter || "";
    console.log(filter);
    

    const users = await userModel.find({
        name :{
            "$regex" : filter
        }
    })

    res.json({
        users : users.map((user)=>({
            name: user.name,
            email: user.email,
            _id : user._id
        }))
    })
}


async function getBalance(req, res) {
    const account = await accountModel.findOne( {userId : req.user._id});
    console.log(account);
    
    if(!account) {
        return res.status(400).json({msg : "account doesn't exist"});
    }
    res.json({
        balance : account.balance
    })
}


async function transferAmount(req, res) {

   
    const {to, amount} = req.body;
    // start session
    const fromAccount = await accountModel.findOne({"userId": req.user._id});

   

    if(!fromAccount || fromAccount.balance < amount ){
        
        return res.status(400).json({msg: "Insufficient Balance"});
    }

    const toAccount =  await accountModel.findOne({"userId": to});
    if(!toAccount){
        
        return res.status(400).json({msg: "Receiver doesnt exist"});
    }


    await accountModel.updateOne({userId : req.user._id}, {$inc: {balance : -amount}});
    await accountModel.updateOne({userId : to}, {$inc :{balance : amount} });

    

    res.json({msg : "transaction completed"});

}





module.exports ={
    signUpUser,
    signInUser,
    updateUser,
    filterUserByName, 
    transferAmount,
    getBalance
}