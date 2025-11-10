import * as converter from 'json-2-csv';
import { API_USERNAME, API_KEY } from '../env/env.js';
import { VENDOR_NAME, PRODUCTS, STYLES, WHOLESALER_URL, EXPORTS_PATH } from '../constants/constants.js'; 
import { getData } from './request.js';
import fs from 'fs';

/**
 * Sends get request to wholesaler api for product and style data
 * then organizes data and stores it in an array. 
 * Finally converting formatted data into CSV and JSON formats.
 */
export const shopify_formatter = async () => {
  
  const prods = await getData(PRODUCTS, API_USERNAME, API_KEY);
  const styles = await getData(STYLES, API_USERNAME, API_KEY);
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
      "Image Src": WHOLESALER_URL+e.colorFrontImage,
      "Variant Image": {
        "Back Image": WHOLESALER_URL+e.colorBackImage,
        "Side Image": WHOLESALER_URL+e.colorSideImage,
        "Direct Side Image": WHOLESALER_URL+e.colorDirectSideImage,
        "Model Front Image": WHOLESALER_URL+e.colorOnModelFrontImage,
        "Model Side Image": WHOLESALER_URL+e.colorOnModelSideImage,
        "Model Back Image": WHOLESALER_URL+e.colorOnModelBackImage
      },
      "Brand Name": e.brandName
    });
  });

  fs.writeFile(`${EXPORTS_PATH}.csv`, converter.json2csv(formatted_data), (err) => { if (err) throw err; });

  fs.writeFile(`${EXPORTS_PATH}.json`, JSON.stringify(formatted_data), (err) => { if (err) throw err; }); 
};

/**
 * Takes in one string and adds hyphens to any blank 
 * spaces in product title. 
 * @param {*} str product title
 * @returns hyphenated string
 */
const add_hyphens = (str) => str.trim().replace(/\s+/g,'-').toLowerCase();

/**
 * Function takes in style array and then maps style objects to styleIDs.
 * This is done for easy look up when the shopify_formatter is iterating through
 * products array. 
 * @param {*} arr  array of styles
 * @returns style map
 */
const styles_map = (arr) => {

  const sMap = {};
  return arr.map((e) => { sMap[e.styleID] = e; });
};

