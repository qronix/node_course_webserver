const express = require('express');
const hbs = require('hbs');
const fs  = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');


app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFileSync('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         maintMsg: 'The site will be back soon!'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req, res)=>{
    res.render('home.hbs',{
        pageTitle:'Home Page',
        welcomeMsg:'Welcome to the home page biiiiiiiitch'
    });
});

app.get('/portfolio',(req,res)=>{
    res.render('portfolio.hbs',{
        pageTitle:'Portfolio Page'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'Server done blowt up!'
    });
});

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});