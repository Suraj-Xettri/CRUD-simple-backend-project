const express = require('express')
const path = require('path')
const app = express()
const userModel = require('./usermodel')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render("index")
})

app.post('/create', async (req, res) => {
    const user = await userModel.create({
        image: req.body.image,
        email: req.body.email,
        username: req.body.Username
    })
    res.redirect('/')
    console.log(user)
})


app.get('/view', async (req, res) => {
    const users = await userModel.find()
    res.render("view",{users: users})
})

app.listen(3000)