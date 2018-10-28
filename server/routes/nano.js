var express = require('express');
var router = express.Router();

var request = require('request');

const AuroraApi = require('./../nano/index');

const api = new AuroraApi({
    host: '192.168.43.138',
    base: '/api/v1/',
    port: '16021',
    accessToken: 'UCueg4GRcTPfeNMIazgx9fvmKMqRGB7i'
});

/* GET users listing. */
router.get('/', function(req, res, next)
{
    api.getInfo()
        .then(function(info)
        {
            res.send('Device information: ' + info);
        })
        .catch(function(err)
        {
            res.send(err);
        });
});

router.put('/on', function (req, res)
{
    api.turnOn()
        .then(function() {
            res.send('Success!');
        })
        .catch(function(err) {
            res.send(err);
        });
});

router.put('/off', function (req, res)
{
    api.turnOff()
        .then(function() {
            res.send('Success!');
        })
        .catch(function(err) {
            res.send(err);
        });
});

/**
 * http://192.168.43.138:16021/api/v1/UCueg4GRcTPfeNMIazgx9fvmKMqRGB7i/effects
 */
router.post('/effect', function (req, res)
{
    console.log("effect id: " + req.body.name);

    let options = {
        method: 'PUT',
        uri: 'http://192.168.43.138:16021/api/v1/UCueg4GRcTPfeNMIazgx9fvmKMqRGB7i/effects',
        body: {
            "select": req.body.name
        },
        json: true
    };

    request(options,
        function (error, response, body)
        {
            /*console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.*/

            res.send('done');
        })
});

module.exports = router;
