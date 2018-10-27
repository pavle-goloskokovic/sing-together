var express = require('express');
var router = express.Router();

const  request   = require('request');

let timeout = null;

function toggle ()
{
    request('http://192.168.43.43/gpio/toggle',
        function (error, response, body)
        {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        }
    );
}

router.get('/start', function(req, res, next)
{
    if(!timeout)
    {
        timeout = setTimeout(function ()
        {
            toggle();

            timeout = null;

        }, 5000);

        toggle();
    }

    res.send('Success!');

});

module.exports = router;
