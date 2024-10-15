
const db = require('../routes/db-config')
const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    console.log('register api')
    console.log(req)
    //const {email, password: Npassword} = req.body
    const Npassword = req.body.password;
    const email = req.body.email;
    console.log(email)
    console.log(Npassword)
    if (!email || !Npassword) return res.json({ status: 'error', error:'Please enter your email and password'})
        else{
            console.log('in the query to fetch')
            db.query('SELECT email FROM users WHERE email = ?', [email], async(err, result) => {
                if (err) throw err;
               if(result.length > 0)
               {
                if (result[0].email != 0 || result == []) {
                    console.log(result[0].email != 0)
                    return res.json({ status: 'error', error:'email has aleady been registed'})
               }   
               }
             
                    
                    else {
                    const password = await bcrypt.hash(Npassword, 8)
                    
                    db.query('INSERT INTO users SET ?', { email: email, password: password }, (error, result) => {
                        if (error) throw error
                        return res.json({ status: 'succsess', success:'User has been registered'})

                    })
                }   
            })
        }
}
module.exports = register
