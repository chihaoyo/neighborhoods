// 10704村里戶數、單一年齡人口
// https://data.gov.tw/dataset/77132

let fs = require('fs')
let content = fs.readFileSync('opendata10704M030.csv', 'utf8')
let hoods = content.split('\n').filter(line => line !== '').map(line => {
  let [a, b, city_district, neighborhood] = line.split(',')
  if(/^[0-9]+$/.test(a)) {
    let city = city_district.substr(0, 3).replace('臺', '台')
    let district = city_district.substr(3).replace('　', '')
    return { city, district, neighborhood }
  } else {
    return false
  }
}).filter(hood => hood !== false)
console.log(JSON.stringify(hoods))
