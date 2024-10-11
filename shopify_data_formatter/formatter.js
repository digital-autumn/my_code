import * as converter from 'json-2-csv';
import * as url from '../bin/urls.js';
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

    const Handle = add_hyphens(style_map[e.styleID].title);
    const Title = style_map[e.styleID].title;
    const BrandName = e.brandName;
    const Body = style_map[e.styleID].description;
    const Vendor = consts_vars.VENDOR_NAME;
    const ProductCategory = "Apparel & Accessories"+" > "+"Clothing Accessories"+" > "+style_map[e.styleID].baseCategory;
    const Option1Name = e.color1;
    const Option1Value = e.colorName;
    const Published = 'true';
    const Variant_SKU = e.sku;
    const Variant_Weight = Math.trunc(e.unitWeight * 1000);
    const Variant_Price = Math.trunc(((e.piecePrice * .50) + e.piecePrice) + 8) + .99;
    const Variant_Weight_Unit = 'g';
    const Variant_Inventory = e.qty;
    const Variant_Inventory_Policy = 'deny';
    const Variant_Image = set_images(e);
    const Status = 'active';

    formatted_data.push({
      Handle,
      Title,
      BrandName,
      Body,
      Vendor,
      ProductCategory,
      Option1Name,
      Option1Value,
      Published,
      Variant_Price,
      Variant_SKU,
      Variant_Weight,
      Variant_Weight_Unit,
      Variant_Inventory,
      Variant_Inventory_Policy,
      Variant_Image,
      Status
    });
  });

  fs.writeFile('Products.csv', converter.json2csv(formatted_data), (err) => {
    if (err) throw err;
  });
};

const add_hyphens = (str) => str.trim().replace(/\s+/g,'-').toLowerCase();

const set_images = (obj) => {

  let image_src = [];

  if (obj.colorFrontImage) image_src.push(url.activewear_web+obj.colorFrontImage);

  if (obj.colorBackImage) image_src.push(url.activewear_web+obj.colorBackImage);

  if (obj.colorSideImage) image_src.push(url.activewear_web+obj.colorSideImage);

  if (obj.colorDirectSideImage) image_src.push(url.activewear_web+obj.colorDirectSideImage);

  if (obj.colorOnModelFrontImage) image_src.push(url.activewear_web+obj.colorOnModelFrontImage);

  if (obj.colorOnModelSideImage) image_src.push(url.activewear_web+obj.colorOnModelSideImage);

  if (obj.colorOnModelBackImage) image_src.push(url.activewear_web+obj.colorOnModelBackImage);

  return image_src;
};

const styles_map = (arr) => {
  const sMap = {};

  arr.map((e) => {
    sMap[e.styleID] = e;
  });

  return sMap;
};

