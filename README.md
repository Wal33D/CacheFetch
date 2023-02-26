Data Caching Class
------------------

A class for caching data from API requests in Node.js. This class makes use of the `fs` and `fetch` modules to store and retrieve data, respectively. The cached data is saved to a JSON file, and the class will automatically check the cache's expiration time and refresh the data as necessary.

### Features

*   Automatically refreshes data when cache has expired
*   Uses `fs` module to save and load cache data
*   Throws an error if no token is provided

### Usage

The class can be imported and instantiated in your Node.js code as follows:

````javascript
const Data = require('./data');  
const data = new Data();
````
The `Data` class has the following methods:

#### `autoUpdate(token, minutes = 1)`

Starts the auto-update process, which checks the cache every `minutes` interval.

*   `token` (required): API token for making requests
*   `minutes` (optional, default `1`): interval in minutes to check cache, default is 1
````javascript
update(token)
````
Updates the cache on call with new data, bypassing the cacheExpiry Timer.

*   `token` (required): API token for making requests

````javascript
getData(token)
````
Gets the data and updates the cache if necessary.

*   `token` (required): API token for making requests

### Example

Here is a complete example of how to use the `Data` class:

````javascript
const Data = require('./data'); 
const data = new Data(); 
const token = 'your_api_token';  

// Get the data 
data.getData(token).then((data) => { console.log(data); });`
````
