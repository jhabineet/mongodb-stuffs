const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://admin:HV0JrLgwzGISqUmG@cluster0.f3jed.mongodb.net/userappnew?retryWrites=true&w=majority&appName=Cluster0")
const User = mongoose.model('Users', {name: String, email: String, password: String})

app.post("/signup", async function(req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // toh signup se pehle you have to check if user already exists or not with the particular email and name -
    const existUser = await User.findOne({ 
        email: email, 
        // name: { $regex: `^${name}$`, $options: "i" }
     });
     // toh if user already exists then you have to send error message ki appka sign up ho chuka hai
    if(existUser) {
        res.status(400).json({message:"User already exists"});
    } else { // aur agar app ka sign up nhi hua toh you have to create new user
        const user = new User({
            name: name,
            email: email,
            password: password
        })
        user.save(); //
        res.status(200).send("User created successfully")
    }
})

app.listen(3000);