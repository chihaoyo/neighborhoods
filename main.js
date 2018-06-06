// 20180205
// https://segis.moi.gov.tw/STAT/Web/Platform/QueryInterface/STAT_QueryProductView.aspx?pid=436ABDE5C5F32DB5B9927ED0C014D041&spid=7ED8D58E129BC680
// https://sheethub.com/area.reference.tw/中華民國行政區

const sourceFilePath = './opendata10704M030-processed.json'
const rowsArrayProp = false
const colCity = 'city'
const colDistrict = 'district'
const colNeighborhood = 'neighborhood'

let hoods = require(sourceFilePath)
if(rowsArrayProp) {
  hoods = hoods[rowsArrayProp]
}
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
