const port =3000;
const express = require("express");
const ejs = require("express-handlebars");
const mongoose = require('mongoose');
const Controller = require('./controllers/Controller');
const app = express();

mongoose.connect("mongodb+srv://rjoshy1:Roshan@srt621roshan.r020c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useUnifiedTopology: true })
    .then(() => console.log('DB Connected'));
mongoose.connection.on('error', (err) => console.log(`There is an error connecting to the database: ${err.message}`));

app.engine('.ejs', ejs.engine({
    defaultLayout: 'layout',
    extname: '.ejs',
}));
app.set('view engine', '.ejs');

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.redirect("/home");
});

app.get("/home", Controller.Home);
app.get("/books/:bookNumber", Controller.BPage);
app.get("/AddNewBook", Controller.Bookadding);
app.post("/AddNewBook", Controller.Bookaddingmore);
app.get("/DeleteABook", Controller.delete);
app.get("/DeleteABook/:bookNumber", Controller.Bookdelete);
app.listen(3000);
console.log(`The port where the server listens ${port}`);


