const sourceFilePath = './20180205-raw.json'
const rowsArrayProp = 'RowDataList'
const colCity = 'COUNTY'
const colDistrict = 'TOWN'
const colNeighborhood = 'VILLAGE'

const hoods = require(sourceFilePath)[rowsArrayProp]
var cities = [...new Set(hoods.map(hood => hood[colCity]))]

var districts = cities.map(city => ({
  city_name: city,
  districts: [...new Set(hoods.filter(hood => hood[colCity] === city).map(hood => hood[colDistrict]))]
}))

var neighborhoods = districts.map(cityObj => ({
  city_name: cityObj.city_name,
  districts: cityObj.districts.map(districtName => ({
    district_name: districtName,
    neighborhoods: hoods.filter(hood => hood[colCity] === cityObj.city_name && hood[colDistrict] === districtName).map(hood => hood[colNeighborhood])
  }))
}))

var obj = {
  cities,
  districts,
  neighborhoods
}
console.log(JSON.stringify(obj))
