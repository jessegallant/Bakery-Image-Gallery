// Make a GET request to the fruityvice api to retrieve some fruit data
const apiRequest = async () => {
  const BASE_URL = 'https://www.fruityvice.com/api/'

  // This endpoint (https://www.fruityvice.com/doc/index.html#api-GET-getAll) returns a list of all the fruits and their info, feel free to play around with different endpoints!
  const resourcePath = 'fruit/all'

  // Making a fetch request to an API endpoint
  // Note: a fetch request is an asynchronous operation, and `await` tells the program to wait until the request has been completed before continuing
  const endpoint = BASE_URL + resourcePath;
  const response = await fetch(buildProxyEndpoint(endpoint), {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // console.log(response);

  // Return the response in JSON format
  return response.json();
}

const updatePage = async () => {
  const gallery = document.getElementById('cs1300-gallery');

  // Make API request and get an array of fruit objects
  const fruitsArray = await apiRequest();

  // TODO: Use either `map` and/or `filter` to extract some data from the array of fruit objects
  // For example, find "name of all fruits whose sugar > 15",

  const filtered = fruitsArray.filter(fruit => fruit.nutritions.carbohydrates > 10);
  console.log(filtered)

  // TODO: Create a new HTML element to display your data
  disp = "LOTSA CARBS:";
  for(i = 0; i < filtered.length; i++){
    disp = disp + filtered[i].name + "\n";
  }
  const newElement = document.createElement('div');
  console.log(disp)
  newElement.innerHTML = disp;
  // TODO: Append your new element to the page
  const existingElement = document.getElementById("cs1300-gallery");
  existingElement.append(newElement);
}

  

/**
 * To access information in this API, we need to send our requests through a proxy due to CORS restrictions.
 * This will be used as our proxy to avoid CORS issues.
 */
// do not touch - stencil code to add the proxy to avoid CORS
const PROXY_URL = 'https://cs1300-cors-anywhere.herokuapp.com/'
const buildProxyEndpoint = (endpoint) => `${PROXY_URL}${endpoint}`;
