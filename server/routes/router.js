const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const Users = require("../models/userSchema");
const bcrypt = require('bcryptjs');
const authenicate = require("../middleware/authenticate")



router.get("/getproducts", async(req, res)=>{
    try {
        const productsdata = await Products.find();
        res.status(201).json(productsdata);
    } catch (error) {
        console.log("error" + error.message);
    }
});

router.get("/getproductsone/:id", async(req, res)=>{
    try {
        const {id} = req.params;

        const individualdata = await Products.findOne({id:id});
        //console.log(individualdata + "individualdata");

        res.status(201).json(individualdata);
    } catch (error) {
        res.status(400).json(individualdata);
        console.log("error" + error.message);
    }
});



router.post("/register", async (req, res) => {
    // console.log(req.body);
    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "filll the all details" });
    };

    try {
        const preuser = await Users.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ error: "This email is already exist" });
        } 
        else if (password !== cpassword) {
            res.status(422).json({ error: "password are not matching" });;
        } else {

            const finaluser = new Users({
                fname, email, mobile, password, cpassword
            });
            
            const storedata = await finaluser.save();
            console.log(storedata + "user successfully added");
            res.status(201).json(storedata);
        }

    } catch (error) {
        console.log("Error at" + error.message);
        res.status(422).send(error);
    }

});



router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        res.status(400).json({ error: "fill the details" });
    }
    
    try {
        
        const userlogin = await Users.findOne({ email: email });
        console.log(userlogin);
        if (userlogin) {
            
            const isMatch = bcrypt.compareSync(password, userlogin.password);
            //console.log(isMatch);

            const token = await userlogin.generateAuthtoken();
            // console.log(token);

            res.cookie("AmazonWeb", token, {
                expires:new Date(Date.now() + 900000),
                httpOnly:true
            })

            if (!isMatch) {
                res.status(400).json({ error: "invalid details" });
            } else {
                res.status(201).json(userlogin);
            }

        }

    } catch (error) {
        res.status(400).json({ error: "invalid crediential pas" });
    }
});



router.post("/addcart/:id", authenicate, async (req, res) => {

    try {
        console.log("perfect 6");
        const { id } = req.params;
        const cart = await Products.findOne({ id: id });
        console.log(cart + "cart milta hain");

        const Usercontact = await Users.findOne({ _id: req.userID });
        console.log(Usercontact + "user milta hain");


        if (Usercontact) {
            const cartData = await Usercontact.addcartdata(cart);

            await Usercontact.save();
            console.log(cartData + " thse save wait kr");
            console.log(Usercontact + "userjode save");
            res.status(201).json(Usercontact);
        }
    } catch (error) {
        console.log(error);
    }
});


router.get("/cartdetails", authenicate, async (req, res) => {
    try {
        const buyuser = await Users.findOne({ _id: req.userID });
        res.status(201).json(buyuser);
    } catch (error) {
        console.log(error + "error for buy now");
    }
});

router.get("/validuser", authenicate, async (req, res) => {
    try {
        const validuserone = await Users.findOne({ _id: req.userID });
        res.status(201).json(validuserone);
    } catch (error) {
        console.log(error + "error for buy now");
    }
});


router.delete("/remove/:id", authenicate, async (req, res) => {
    try {
        const { id } = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curel) => {
            return curel.id != id
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("iteam remove");

    } catch (error) {
        console.log(error + "jwt provide then remove");
        res.status(400).json(error);
    }
});









module.exports = router;