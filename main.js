const hoods = require('./20170131-raw.json')
var cities = [...new Set(hoods.map(hood => hood.city_name))]

var districts = cities.map(city => ({
  city_name: city,
  districts: [...new Set(hoods.filter(hood => hood.city_name === city).map(hood => hood.district_name))]
}))

var neighborhoods = districts.map(cityObj => ({
  city_name: cityObj.city_name,
  districts: cityObj.districts.map(districtName => ({
    district_name: districtName,
    neighborhoods: hoods.filter(hood => hood.city_name === cityObj.city_name && hood.district_name === districtName).map(hood => hood.neighborhood_name)
  }))
}))

var obj = {
  cities,
  districts,
  neighborhoods
}
console.log(JSON.stringify(obj))
