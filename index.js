const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PK = "pk_test_51LxHexDte41dLHinwMjyrWV7fvq0hlLpBXMFLUrJPoAGaC8znUgsEYFeJtomtTr2uUqAA4B757RYFhvKKQA5KcBe00ilAzSQ7i";
const SK = "sk_test_51LxHexDte41dLHinspvBfktxWH9CZLk7ntJxPtLxtmzPwiH55s4t3G6zGTK0ENIIt1LX7acmLjNp47nnHMjj513W00WdmGz2aO";
const stripe = require('stripe')(SK);
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");


const PORT = process.env.PORT || 3000;

app.get('/', (req,res)=>{
    res.render('Home', {
        key: PK
    });

})


//app.put()
//or review app.post methods

app.post('/payment',(req,res)=>{
    stripe.customers.create({
        email:req.body.stripeEmail,
        source: req.body.stripeToken, //accesstoken info is taken from here
        name:'Michael Kyle',
        address:{
            line1: '4321 Major Payne',
            postal_code: '06381',
            city: 'Stamford',
            state: 'Connecticut'
        },
        //timestamps: true
    })
    .then((customer)=> {
        return stripe.charges.create({
            amount:7000, //converting from rupees to USD
            description: 'Web Development Product',
            currency:'USD',
            customer: customer.id //pointing to id of customer which was passed
        })
    })
    .then((charge)=>{
        console.log(charge);
        res.send("Confirmation! Successful Payment!");
    })
    .catch((err)=>{
        res.send(err);
    })

})

app.listen(PORT, ()=>{
    console.log(`App is listening on ${PORT}`);
});

//done





