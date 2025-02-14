/**
 * @param {*} url wholesaler url
 * @param {*} uName username 
 * @param {*} uKey userkey
 * @returns data in JSON format retrived from the wholesaler
 */
export const getData = async (url, uName, uKey) => {
  
  const auth = 'Basic '+btoa(`${uName}:${uKey}`);
  
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