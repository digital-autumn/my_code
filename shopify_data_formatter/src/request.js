/**
 * @param {*} url wholesaler url
 * @param {*} uName username 
 * @param {*} uKey userkey
 * @returns data in JSON format retrived from the wholesaler
 */
export const getData = async (url, uName, uKey) => {

  const options = { 
    method: 'get',
    headers: {
      Authorization: `Basic ${btoa(`${uName}:${uKey}`)}`,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    mode: 'cors',
    cache: 'default'
  };
  
  try {
    const response = await fetch(url, options);
    return await response.json();

  } catch (error) {
    console.error(error);
  };
};