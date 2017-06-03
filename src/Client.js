// import fetch from 'isomorphic-fetch';
/* eslint-disable no-undef */
function get(endpoint, query) {
  const param = query 
    ? `api/${endpoint}?q=${query}`
    : `api/${endpoint}`;

  return fetch(param, {
    accept: 'application/json',
   'Content-Type': 'application/json'
  }).then(checkStatus)
    .then(parseJSON)
    .catch(err => console.log(err) )
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
  console.log('checkstatus', response)
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

const Client = { get, post };
export default Client;