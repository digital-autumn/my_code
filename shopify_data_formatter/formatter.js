import * as converter from 'json-2-csv';
import { API_USERNAME, API_KEY } from '../env/env.js';
import { VENDOR_NAME } from '../helpers/constants.js'; 
import { getData } from './request.js';
import { all_prods, all_styles, activewear_url } from '../helpers/urls.js';
import fs from 'fs';

export const shopify_formatter = async () => {
  
  const prods = await getData(all_prods, API_USERNAME, API_KEY);
  const styles = await getData(all_styles, API_USERNAME, API_KEY);
  const style_map = styles_map(styles);

  const formatted_data = [];

  prods.map((e) => {
    formatted_data.push({
      "Handle": add_hyphens(style_map[e.styleID].title),
      "Vendor": VENDOR_NAME,
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
      "Image Src": activewear_url+e.colorFrontImage,
      "Variant Image": {
        "Back Image": activewear_url+e.colorBackImage,
        "Side Image": activewear_url+e.colorSideImage,
        "Direct Side Image": activewear_url+e.colorDirectSideImage,
        "Model Front Image": activewear_url+e.colorOnModelFrontImage,
        "Model Side Image": activewear_url+e.colorOnModelSideImage,
        "Model Back Image": activewear_url+e.colorOnModelBackImage
      },
      "Brand Name": e.brandName
    });
  });

  fs.writeFile('./exports/Products.csv', converter.json2csv(formatted_data), (err) => {if (err) throw err;});

  fs.writeFile('./exports/Products.json', JSON.stringify(formatted_data), (err) => {if (err) throw err;}); 
};

const add_hyphens = (str) => {return str.trim().replace(/\s+/g,'-').toLowerCase()};

const styles_map = (arr) => {

  const sMap = {};
  arr.map((e) => {sMap[e.styleID] = e;});

  return sMap;
};
