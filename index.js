const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const generateScraperUrl = (apiKey) =>`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.use(express.json());

app.get('/', (req,res) =>{
    res.send('Welcome to Amazon Scraper API');
});

// fetching product details
app.get('/product/:productid', async (req,res) =>{
    const {productid } = req.params;
    const {api_key} = req.query;
    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productid}`);
        res.json(JSON.parse(response));
    }
    catch(error){
        res.json(error);
    }
});

// get reviews of product
app.get('/product/:productid/reviews', async (req,res) =>{
    const {productid } = req.params;
    const {api_key} = req.query;
    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productid}/`);
        res.json(JSON.parse(response));
    }
    catch(error){
        res.json(error);
    }
});

// get product offers
app.get('/product/:productid/offers', async (req,res) =>{
    const {productid } = req.params;
    const {api_key} = req.query;
    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productid}/`);
        res.json(JSON.parse(response));
    }
    catch(error){
        res.json(error);
    }
});

app.get('/search/:searchQuery', async (req,res) =>{
    const {searchQuery } = req.params;
    const {api_key} = req.query;
    try{
        const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}/`);
        res.json(JSON.parse(response));
    }
    catch(error){
        res.json(error);
    }
});

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
})