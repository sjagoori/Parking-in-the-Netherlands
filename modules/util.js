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
 * Function returns object based on 2 object matching areaid
 * @param {Object} data - dataset of parkingspaces
 * @param {Object} data - dataset of parkingspaces
 */
export function matchAreaId(d1, d2) {
  return d1.map(element => d2.find(key => element.areaid == key.areaid)).filter(item => typeof item === 'object')
}
