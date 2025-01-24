import axios from 'axios';

const instance = axios.create({ baseURL: process.env.REACT_APP_API_BASE_URL });
// You can add common headers or auth tokens here
//instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export const fetchData = async (url) => {
  try {
    const response = await instance.get('/' + url);
    //return response.data.data;
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    // Handle errors here or throw them to be handled where the function is called
    throw error;
  }
};