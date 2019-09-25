var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('/home/ec2-user/environment/data/week01/07.html');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var addresses = ''; // addresses held 

// locate the addresses in html 
const table = $('tbody').find('td').has('h4'); 

// function to remove extra content and convert to text 

table.each(function(i, elem) {
  
   $('h4').remove()
    $('b').remove()
    $('div').remove()
    $('br').remove()
    $('a').remove()
    $('#GetDirection').remove()
    $('img').remove()
    $('span').remove()
   
   //converts to text and uses regular expressions to get rid of spaces 
    //const item = addresses +=  ($(elem).first().text().replace(/\s\s+/g, '')) + '\n';
    let item = addresses +=  ($(elem).first().text().replace(/\s\s+/g, '').replace(/,.*/g, "")) + ','; // needed to add another regular expression to get rid of everything after comma 
    let itemSplit = item.split(","); // split at comma 
    console.log
    
    var meetingData = [];
    meetingData.push(itemSplit); // push new addresses into array 
    //delete meetingData[0];
    
    // if (meetingData == '|||||||' || '' || ' - Rectory basement'){
    //  meetingData == ""
    // }
  
    // meetingData_f = meetingData.filter(e => e !== 'Church of the Good Shepard');
//      for (let i = 0; i < meetingData.length; i++) {
//     if (meetingData[i] === 'Church of the Good Shepard') {
//     meetingData.splice(i, 1); // At the current index, remove one element
//   }

// }
    // for debugging 
    
    
  
    //console.log(meetingData);
    
    // write to file 
    fs.writeFileSync('/home/ec2-user/environment/data/meetingData.json', JSON.stringify(addresses)); 
    //fs.writeFileSync('/home/ec2-user/environment/data/meeting.csv', addresses);
});

// write to file 
//fs.writeFileSync('/home/ec2-user/environment/data/addresses3.csv', meetingData);
//fs.writeFileSync('/home/ec2-user/environment/data/meetingData.json', JSON.stringify(addresses));

