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