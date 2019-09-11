var request = require('request');
var fs = require('fs');

// setting an array for the number of pages 
const num = ['01','02','03','04','05','06','07','08','09','10']


// for loop to loop over array and then using string interpelation to write file sync
for (let i=0; i<10; i++) {
		request(`https://parsons.nyc/aa/m${num[i]}.html`, function(error, response, body){
	    if (!error && response.statusCode == 200) {
	        fs.writeFileSync(`/home/ec2-user/environment/data/week01/${num[i]}.html`, body);
	    }
	    else {console.log("Request failed!")}
		});
	}
