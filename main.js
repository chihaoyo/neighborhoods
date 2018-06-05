const sourceFilePath = './20170131-raw.json'
const colCity = 'city_name'
const colDistrict = 'district_name'
const colNeighborhood = 'neighborhood_name'

const hoods = require(sourceFilePath)
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
