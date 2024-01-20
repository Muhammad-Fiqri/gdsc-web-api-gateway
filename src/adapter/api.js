const axios = require('axios');

const {
  TIMEOUT
} = process.env;

module.exports = (baseUrl) => {
  return axios.create({
    baseURL: baseUrl,
<<<<<<< HEAD
    timeout: parseInt(TIMEOUT),
=======
    timeout: parseInt(TIMEOUT)
>>>>>>> 39a8e8ed507969226021fb7ca606dcf3c95c140f
  });
}