const router = require('express').Router();
const {User} = require('../models')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/***User SignUP***/
router.post('/register', async (req,res) => {
    //  let { username, password } = req.body;
    
    try {
        const newUser = await User.create({
            username: req.body.user.username,
            password: bcrypt.hashSync(req.body.user.password, 13),
        })
        res.status(201).json({
            message: 'User Created',
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            message:"tell me why",
            err:error,
            
        })
    }
})


/***User Login***/
router.post('/login', async (req, res) => {
    let { username, password } = req.body.user;

    try {
        let loginUser = await User.findOne({
            where: { username }
        })
        // console.log("loginUser", loginUser)

        if(loginUser && await bcrypt.compare(password, loginUser.password)) {

            const token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24}) //86,400 seconds

            res.status(200).json({
                message: 'Login Succeeded!',
                user: loginUser,
                token
            })
            
        } else {
            res.status(401).json({
                message: "Login Failed: Userinformation incorrect"
            })
        }
    } catch (error) {
        res.status(500).json({
            error: 'Error Logging in!'
        })
    }
})


module.exports = router