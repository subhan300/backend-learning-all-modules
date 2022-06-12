// call api and provide address of api from terminal 
const yargs = require('yargs')
const request = require('postman-request');

// Customize yargs version
yargs.version('1.1.0')
   
// Create add command

yargs.command({
    command: 'add_api',
    describe: 'take address and location ',
    builder: {
        address: {
            describe: 'address',
            demandOption: true,  // Required
            type: 'string'     
        },
        location: {  
            describe: 'places',
            demandOption: true,
            type: 'string'
        }
    },
  
    // Function for your command
    handler(argv) {
        request(`http://www.google.com?${argv[2]?.places && argv[2].location}`, function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body); // Print the HTML for the Google homepage.
console.log(argv)
          });
    }
})
   
yargs.parse() // To set above changes