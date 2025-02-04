import * as cheerio from 'cheerio';
import * as converter from 'json-2-csv';
import fs from 'fs';

const priceFormatter = (str) => {return str.substring(str.length-8, str.length).replace('^0+', '');};

export const getData = async (url) => {

   const data = [];
   let numProds;

  try {

   const response = await fetch(url);
   const body = await response.text();

   const $ = cheerio.load(body);
   const products = $('li.product_wrapper');

   products.each((i, e) => {

      const model = $(e).find('div.h2').text().replace('\n', ' ').trim().split(';')[0];
      const sku = $(e).find('.sku').text().trim().replace(/[^\d.-]/g, '');
      const price = priceFormatter($(e).find('div.price').text().trim()).replace(/[^\d.-]/g, '');
      
      data.push({
         model,
         sku,
         price
      });
      
      numProds = i;
   });
   
   fs.appendFile('e_commerce_data.json', JSON.stringify(data), (err) => {
      if (err) throw err;
   });

   fs.appendFile('e_commerce_data.csv', converter.json2csv(data), (err) => {
      if (err) throw err;
   });

   console.log(numProds);
  }
  catch(err){
   console.error(err);
  }
};
