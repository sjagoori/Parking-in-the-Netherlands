import axios from 'axios'

/**
* Funtion makes a GET request to given url 
* @param {String} url - API endpoint
*/
export async function getData(url) {
  return await axios.get(url).then(response => response.data)
}

/**
 * Function returns value from dataset object
 * @param {Object} data - dataset 
 * @param {String} column - used column in dataset object 
 */
export function filterData(data, column) {
  return data.map(result => result[column])
}

/**
 * Function returns value from dataset object
 * @param {Object} data - dataset of parkingspaces
 * @param {Boolean} condition - disabled friendly
 */
export function filterDisabled(data, condition) {
  return data.filter(key => key.disabledaccess == condition)
}

/**
 * Function returns value from dataset object
 * @param {Object} data - dataset of parkingspaces
 */
export function filterAreaIdDisabled(data) {
  return data.filter(key => key.disabledaccess == 1 ? key.areaid : false)
}

/**
 * Function returns object based on 2 objects matching areaid
 * @param {Object} d1 - dataset of parkingspaces
 * @param {Object} d1 - dataset of parkingspaces
 */
export function matchAreaId(d1, d2) {
  return d1.map(element => d2.find(key => element.areaid == key.areaid)).filter(item => typeof item === 'object')
}

/**
 * Function returns location names from the areadesc  key.
 * @param {Object} data - dataset 
 */
export function getLocationNames(data) {
  // some entries do not have a description
  return data.map(key => key['areadesc'] ? groupInBrackets(key.areadesc) : false).filter(item => typeof item === 'string')
}

/**
 * Function finds province for a given place
 * @param {String} city - city name 
 * @param {Object} d1 - dataset
 */
export function findProvince(city, d1) {
  return d1.map(element => element.place === city ? element.province : false).filter(item => typeof item === 'string')[0]
}

/**
 * Function returns strings contained in brackets
 * @param {String} element - string
 */
function groupInBrackets(element) {
  return element.includes('(') ? element.match(/(?<=\().+?(?=\))/)[0] : false
}

/**
 * Function capitalizes first letter of given string
 * @param {String} word - string to capitalize
 */
export function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}
