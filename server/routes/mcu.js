var express = require('express');
var router = express.Router();

const  request   = require('request');
let timeoutBegin = null;
let timeout = null;
let timeoutStart = null;
let timeoutEnd = null;
let timeoutWet = null;

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

    if(!timeoutWet)
    {
        timeoutWet = setTimeout(function ()
        {
            toggle();

            timeoutWet = null;

        }, 2000);

        toggle();
    }


    if(!timeoutStart)
    {
        timeoutStart = setTimeout(function ()
        {
            toggle();

            timeoutStart = null;

        }, 3000);

    }

    if(!timeoutEnd)
    {
        timeoutEnd = setTimeout(function ()
        {
            toggle();

            timeoutEnd = null;

        }, 13000);

    }


    res.send('Success!');

});

module.exports = router;
