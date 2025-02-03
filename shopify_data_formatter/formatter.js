import * as converter from 'json-2-csv';
import * as url from '../helpers/urls.js';
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

      const data = await response.json();
      
      return data;

  } catch (error) {
    console.error(error);
  };
};

export const shopify_formatter = async () => {
  
  const prods = await getData(url.all_prods);
  const styles = await getData(url.all_styles);
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
      "Variant Image": set_image(e),
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

const set_image = (obj) => {

  let image_src = [];

  if (obj.colorFrontImage) image_src.push(obj.colorFrontImage);

  if (obj.colorBackImage) image_src.push(obj.colorBackImage);

  if (obj.colorSideImage) image_src.push(obj.colorSideImage);
  
  if (obj.colorDirectSideImage) image_src.push(obj.colorDirectSideImage);

  if (obj.colorOnModelFrontImage) image_src.push(obj.colorOnModelFrontImage);

  if (obj.colorOnModelSideImage) image_src.push(obj.colorOnModelSideImage);

  if (obj.colorOnModelBackImage) image_src.push(obj.colorOnModelBackImage);

  return image_src;
};

const styles_map = (arr) => {
  const sMap = {};

  arr.map((e) => {sMap[e.styleID] = e;});

  return sMap;
};

