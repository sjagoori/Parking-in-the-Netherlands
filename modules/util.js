export function filterData(data, column) { 
  return data.map(result => result[column])
} 