import axios from 'axios';

const portNum = 5000;
const url = 'http://' + window.location.hostname + ':' + portNum + '/';

function get(endpoint, params = '') {
  return axios.get(url + endpoint + '/' + params, {
    headers: {
      Authentication: `${sessionStorage.getItem('accessToken')}`,
    },
  });
}

async function post(endpoint, data) {
  return axios.post(url + endpoint, data);
}

async function put(endpoint, data) {
  return axios.put(url + endpoint, data, {
    headers: {
      Authentication: `${sessionStorage.getItem('accessToken')}`,
    },
  });
}

async function del(endpoint) {
  return axios.delete(url + endpoint, {
    headers: {
      Authentication: `${sessionStorage.getItem('accessToken')}`,
    },
  });
}

export { get, post, put, del as delete };
