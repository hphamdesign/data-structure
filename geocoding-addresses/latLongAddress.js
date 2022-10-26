const fs = require('fs');

// Read JSON file
var fullAddress = JSON.parse(fs.readFileSync('data/first.json'))

let addresses = fullAddress.map(x => ({streetAddress: x.InputAddress.StreetAddress,latitude: x.OutputGeocodes[0].OutputGeocode.Latitude,longitude:x.OutputGeocodes[0].OutputGeocode.Longitude}));

console.log(addresses)

fs.writeFileSync('/home/ec2-user/environment/data-structure/data/latLong.json', JSON.stringify(addresses));
