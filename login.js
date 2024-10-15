
const jwt = require('jsonwebtoken')
const db = require('../routes/db-config')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    console.log(req)
    //const { email, password } = req.body
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) return res.json({ status: 'error', error:'Please enter your email and password'})
    else {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (Err, result)=>{
            if(Err) throw Err
           // console.log(await bcrypt.compare(password, result[0].password))
            if (!result[0] || !await bcrypt.compare(password, result[0].password))
            {
                if (!email || !password) 
                    return res.json({ status: 'error', error:'incorrect email and password'})
             
            }
                 else{
                 console.log(result)
                 if(result.length > 0)
                 {
                    const token = jwt.sign({id: result[0].id}, process.env.JWT_SECRET, {
                        expiresIn: process.env.JWT_EXPIRES
                       
                        
                    })
                    console.log("logged in")
                    console.log(token)
                    // const cookieOptions = {
                    //     expiresIn: new Date(Date.new() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    //     httpOnly: true
                    // }
                    // res.cookie('userRegistered', token, cookieOptions)
                    return res.json({ status: 'success', success: 'user has been logged in'})
             
                 }
                 else
                 {
                     console.log('user not found')
                    return res.json({status: 'error' , success: 'user not found'})
                 }
                 }
            
        })
    }    
}

module.exports = login