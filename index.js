
const express = require('express')
const db = require('./routes/db-config')
const app = express()
const cookie = require('cookie-parser')

const PORT = process.env.PORT || 4000

app.use('/js', express.static(__dirname + "/public/js"))
app.use('/css', express.static(__dirname + '/public/css'))
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(cookie())
app.use(express.json())

app.use('/', require('./routes/pages'))
app.use('/api', require('./controllers/auth'))

app.listen(4000)

db.connect((err) => {
    if (err) throw err
    //console.log('database connected')
})


//app.get('/', (req, res) => {
//    res.render('index.ejs')
//})

//app.get('/login', (req, res) =>{
//    res.render('login.ejs')
//})

//app.get('/register', (req, res) =>{
//    res.render('register.ejs')
//})