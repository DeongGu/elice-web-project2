import axios from "axios";

const portNum = 5000;
const url = "http://" + window.location.hostname + ":" + portNum + "/";

async function get(endpoint, params = "") {
  return axios.get(url + endpoint + "/" + params, {
    header: {
      Authentication: `${sessionStorage.getItem("accessToken")}`,
    },
  });
}

async function post(endpoint, data) {
  return axios.post(url + endpoint, data);
}

async function put(endpoint, data) {
  return axios.put(url + endpoint, data, {
    header: {
      Authentication: `${sessionStorage.getItem("accessToken")}`,
    },
  });
}

async function del(endpoint) {
  return axios.delete(url + endpoint, {
    header: {
      Authentication: `${sessionStorage.getItem("accessToken")}`,
    },
  });
}

export { get, post, put, del as delete };
