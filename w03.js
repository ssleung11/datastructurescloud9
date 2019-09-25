// dependencies
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv

// TAMU api key
dotenv.config();
const apiKey = process.env.TAMU_KEY;

// geocode addresses
var meetingsData = [];
//var addresses = ["63 Fifth Ave"]; 
var addresses = fs.readFileSync('/home/ec2-user/environment/data/meetingData.json');
addresses = JSON.parse(addresses).split(','); // need to parse json after loaded 
var address = [];
address.push(addresses); // push json into array 

//console.log(address); // debug to make sure array is displaying correctly 
//var addresses = fs.readFileSync('/home/ec2-user/environment/data/meeting.csv');
//console.log(addresses);
//var addresses = ["63 Fifth Ave", "16 E 16th St", "2 W 13th St"];// read in your addresses from weekly assignment 2 
//var first = false; 
// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
    apiRequest += 'streetAddress=' + value.split(' ').join('%20');
    apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
    apiRequest += '&format=json&version=4.01';
    // if (first===false){
    //console.log(apiRequest);
    // first = true; 
    // }
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
            //console.log(tamuGeo['FeatureMatchingResultType']);
            let streetAddress = tamuGeo['InputAddress']["StreetAddress"]; 
            //console.log(streetAddress);
            let lat = tamuGeo['OutputGeocodes'][0]["OutputGeocode"]["Latitude"];
            //console.log(lat);
            let long = tamuGeo['OutputGeocodes'][0]["OutputGeocode"]["Longitude"];
            //console.log(long);
            
            // work area 
            
            let info = { "address": streetAddress, "latitude": lat, "longitude": long}; // object for addresses 
           // WHY DOESNT THIS WORK??????? URG , wait, for loop not needed b/c async eachSeries()
            // for (let i = 0; i > addresses.length; i++){
            // https://stackoverflow.com/questions/8925820/javascript-object-push-function
            // data[i] = { "address": streetAddress, "latitude": lat, "longitude": long};
            
            // meetingsData.push(data[i]);
            // }
            
            meetingsData.push(info); // push into object 
            // console.log(data);           
            // work area 
            
            
        }
            // }
            //console.log(data);
            //console.log(obj);
            //console.log(meetingData);
    });
    setTimeout(callback, 2000);
}, function() {
    fs.writeFileSync('/home/ec2-user/environment/data/longlat.json', JSON.stringify(meetingsData));
    // console.log('*** *** *** *** ***');
    // console.log('Number of meetings in this zone: ');
     //console.log(meetingsData.length);
     console.log(meetingsData);
});


