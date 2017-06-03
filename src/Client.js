import fetch from 'isomorphic-fetch';
/* eslint-disable no-undef */
function search(query, cb) {
  return fetch(`api/main?q=${query}`, {
    accept: 'application/json',
   'Content-Type': 'application/json'
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}

function post(endpoint, body) {
  return fetch(`api/${endpoint}`, {
    method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(checkStatus)
    .then(parseJSON)
    .catch(err => console.log(err) )
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { search, post };
export default Client;