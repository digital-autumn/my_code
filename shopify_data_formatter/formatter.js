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
      "Title": style_map[e.styleID].title,
      "BrandName": e.brandName,
      "Body": style_map[e.styleID].description,
      "Vendor": consts_vars.VENDOR_NAME,
      "Product Category": "Apparel & Accessories"+" > "+"Clothing Accessories"+" > "+style_map[e.styleID].baseCategory,
      "Option1 Name": e.color1,
      "Option1 Value": e.colorName,
      "Published": 'true',
      "Variant Price": Math.trunc(((e.piecePrice * .50) + e.piecePrice) + 8) + .99,
      "Variant SKU": e.sku,
      "Variant Weight": Math.trunc(e.unitWeight * 1000),
      "Variant Weight Unit": 'g',
      "Variant Inventory": e.qty,
      "Variant Inventory Policy": 'deny',
      "Variant Image": set_images(e),
      "Status": 'active'
    });
  });

  fs.writeFile('Products.csv', converter.json2csv(formatted_data), (err) => {
    if (err) throw err;
  });

  fs.writeFile('Products.json', JSON.stringify(formatted_data), (err) => {
    if (err) throw err;
  }); 
};

const add_hyphens = (str) => {return str.trim().replace(/\s+/g,'-').toLowerCase()};

const set_images = (obj) => {
  return {
   "Front Image": urls.activewear_url+obj.colorFrontImage,
   "Back Image": urls.activewear_url+obj.colorBackImage,
   "Side Image": urls.activewear_url+obj.colorSideImage,
   "Direct Side Image": urls.activewear_url+obj.colorDirectSideImage,
   "Model Front Image": urls.activewear_url+obj.colorOnModelFrontImage,
   "Model Side Image": urls.activewear_url+obj.colorOnModelSideImage,
   "Model Back Image": urls.activewear_url+obj.colorOnModelBackImage
  };
};

const styles_map = (arr) => {
  const sMap = {};

  arr.map((e) => {sMap[e.styleID] = e;});

  return sMap;
};
