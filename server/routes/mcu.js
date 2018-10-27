var express = require('express');
var router = express.Router();

const  request   = require('request');

let interval = null;

function toggle ()
{
    request('http://www.google.com',
        function (error, response, body)
        {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        }
    );
}

router.get('/on', function(req, res, next)
{
    toggle();

    if(interval)
    {
        clearInterval(interval);
    }

    interval = setInterval(function ()
    {
        toggle();

    }, 5000);

    res.send('Success!');

});

router.get('/off', function(req, res, next)
{
    if(interval)
    {
        clearInterval(interval);
    }

    res.send('Success!');

});

module.exports = router;
