var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('data/thesis.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print (to the console) names of thesis students
$('h3').each(function(i, elem) {
    console.log($(elem).text().trim()); // this is method chain, sequentially, the trim gets rid of white space, there;s also a HTMLmethod 
});

// write the project titles to a text file
// come up with a better way to sort this (this is hard to reach) - the string is a terrible container, what is a better container, a json???? 
var thesisTitles = ''; // this variable will hold the lines of text

// clue- its easier to put things together than to take them apart, street, city, state, zip, all in different key value pairs 

$('.project .title').each(function(i, elem) { // this loops for the class Projects, then looks inside that div to look for the class title 
    thesisTitles += ($(elem).text()).trim() + '\n';
});

fs.writeFileSync('data/thesisTitles.txt', thesisTitles);

// very common tool, split() method, it splits into an argument ie 
// var string = console.log(thisHtml.split('<br />')

// for (var i = 0; i<string.length; i++){
//     if ( i ===2) {
//     console.log(string[i].trim());
//     console.log('******')
//     };
// }

// the cleaner the addresses are, the better the next assignment will be (do all 10 zones if you got it in you)
// clean as in mailing labels (check out USPS address standardization)
// rather have data in database that you don't use, rather than data that you don't save 