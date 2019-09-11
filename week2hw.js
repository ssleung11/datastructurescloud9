var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('/home/ec2-user/environment/data/week01/07.html');

// load `content` into a cheerio object
var $ = cheerio.load(content);

var addresses = ''; // addresses held 

// locate the addresses in html 
const table = $('tbody').find('td').has('h4'); 
//const table = $('tbody'); 
//const table2 = $(table.find('td').has('h4'));

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
    const item = addresses +=  ($(elem).first().text().replace(/\s\s+/g, '')) + '\n';
    //const item2 = item.split("Wheelchair");
   
    console.log(item);
});

// write to file 
fs.writeFileSync('/home/ec2-user/environment/data/addresses.csv', addresses);
