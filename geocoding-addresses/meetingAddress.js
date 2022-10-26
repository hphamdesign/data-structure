// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the cheerio object into a variable, `content`
// which holds data and metadata about the html file (written as txt)
var content = fs.readFileSync('/home/ec2-user/environment/data-structure/data/m01.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

let rawData = [];
// let finalData = [];
let addressList = [];

$('tr').each(function(i, elem) {
    if ($(elem).attr("style")=="margin-bottom:10px") {
        // console.log($(elem).html());
        // console.log('*************')
        let rawData = $(elem).html();
        //run function
        let final = parseData(rawData);
        console.log(final)
     }
    });

function parseData(data) {
    //defining 2 separate tds
    let td1=data.split('</td>')[0]
    let td2=data.split('</td>')[1]
    
    //Parsing location
    let finalName = td1.split(' - ')[0].split('<b>')[1]
    let finalLocation = td1.split('</h4>')[0].split('<h4 style="margin:0;padding:0;">')[1]
    
    //address
    let rawAddress = td1.split('<b>')[1].split("<br>")[1].replace(',','').trim()
    let address;
        if(rawAddress.includes('Enter')){
            address = rawAddress.split('Enter')[0].trim()
        }
        else if(rawAddress.includes('Conference')){
            address = rawAddress.split('Conference')[0].trim()
        }
        else if(rawAddress.includes('1st')){
            address = rawAddress.split('1st')[0].trim()
        }
        else if(rawAddress.includes('-')){
            address = rawAddress.split('-')[0].trim()
        }
        else if(rawAddress.includes('Rectory Basement')){
            address = rawAddress.split('Rectory Basement')[0].trim()
        }
        else if(rawAddress.includes('Basement')){
            address = rawAddress.split('Basement')[0].trim()
        }
        else if(rawAddress.includes('\n\t\t\t\t\t\t')){
            address = rawAddress.replace('\n\t\t\t\t\t\t','').trim()
        }
        else{
            address = rawAddress.trim()
        }
    let finalAddress;
        if(address.includes('(')){
            finalAddress = address.split('(')[0].trim()
        }
        else if(address.includes('-')){
            finalAddress = address.split('-')[0].trim()
        }
        else if(address.includes(',')){
            finalAddress = address.split(',')[0].trim()
        }
        else if(address.includes('100')){
            finalAddress = address.slice(0,-6)
        }
        else{
            finalAddress = address.trim()
        }
    
    let zip = td1.split('<b>')[1].split('\t\t\t\t\t\t<br>')[1].replace('\n','').trim()
    let finalZip;
        if(zip.includes('NY ')){
            finalZip= zip.slice(-9).replace('NY','').trim()
        }
        else if(zip.includes('NY')){
            finalZip= zip.slice(-3).replace('NY','').trim()
        }
        else if(zip.includes('')){
            finalZip=""
        }
        else{
            finalZip= zip.slice(-6)
        }


addressList.push(finalAddress)


return addressList;

};
//fs.writeFileSync('/home/ec2-user/environment/data-structure/data/final.json', JSON.stringify(addressList))
