import * as converter from 'json-2-csv';
import * as urls from '../helpers/urls.js';
import * as consts_vars from '../env/constants.js'; 
import * as env_creds from '../env/env_creds.js';
import fs from 'fs';

const getData = async (url) => {

  const auth = 'Basic '+btoa(`${env_creds.API_USERNAME}:${env_creds.API_KEY}`);
  
  try {
    const response = await fetch(url, 
      { 
        method: 'get',
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        mode: 'cors',
        cache: 'default'
      });
      
      return await response.json();

  } catch (error) {
    console.error(error);
  };
};

export const shopify_formatter = async () => {
  
  const prods = await getData(urls.all_prods);
  const styles = await getData(urls.all_styles);
  const style_map = styles_map(styles);

  const formatted_data = [];

  prods.map((e) => {
    formatted_data.push({
      "Handle": add_hyphens(style_map[e.styleID].title),
      "Vendor": consts_vars.VENDOR_NAME,
      "Published": true,
      "Option1 Name": e.color1,
      "Option1 Value": e.colorName,
      "Variant Grams": Math.trunc(e.unitWeight * 1000),
      "Variant Inventory": e.qty,
      "Variant Inventory Policy": 'deny',
      "Variant Fulfillment Service": 'manual',
      "Variant Price": Math.trunc(((e.piecePrice * .50) + e.piecePrice) + 8) + .99,
      "Variant Requires Shipping": true,
      "Variant Taxable": true,
      "Gift Card": false,
      "Variant Weight Unit": 'g',
      "Included / [Primary]": false,
      "Included / International": false,
      "Status": 'active',
      "Title": style_map[e.styleID].title,
      "Body (HTML)": style_map[e.styleID].description,
      "Product Category": "Apparel & Accessories"+" > "+"Clothing Accessories"+" > "+style_map[e.styleID].baseCategory,
      "Variant SKU": e.sku,
      "Image Src": urls.activewear_url+e.colorFrontImage,
      "Variant Image": {
        "Back Image": urls.activewear_url+e.colorBackImage,
        "Side Image": urls.activewear_url+e.colorSideImage,
        "Direct Side Image": urls.activewear_url+e.colorDirectSideImage,
        "Model Front Image": urls.activewear_url+e.colorOnModelFrontImage,
        "Model Side Image": urls.activewear_url+e.colorOnModelSideImage,
        "Model Back Image": urls.activewear_url+e.colorOnModelBackImage
      },
      "Brand Name": e.brandName
    });
  });

  fs.writeFile('Products.csv', converter.json2csv(formatted_data), (err) => {if (err) throw err;});

  fs.writeFile('Products.json', JSON.stringify(formatted_data), (err) => {if (err) throw err;}); 
};

const add_hyphens = (str) => {return str.trim().replace(/\s+/g,'-').toLowerCase()};

const styles_map = (arr) => {

  const sMap = {};
  arr.map((e) => {sMap[e.styleID] = e;});

  return sMap;
};
