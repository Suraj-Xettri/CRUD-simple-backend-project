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
})


app.get('/view-users', async (req, res) => {
    const users = await userModel.find()
    res.render("view",{users: users})
})

app.get('/edit/:edit', async (req, res) => {
    const user =  await userModel.findOne({_id: req.params.edit})
    res.render("edit", {user: user})
})


app.get('/delete/:userID', async (req, res) => {
    try {
        const deletedUser = await userModel.findOneAndDelete({ _id: req.params.userID });
        if (deletedUser) {
            res.redirect('/view-users'); // Adjust this as needed
        } else {
          res.status(404).send('User not found');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
      }
})


app.listen(3000)