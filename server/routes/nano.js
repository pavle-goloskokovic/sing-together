var express = require('express');
var router = express.Router();

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

module.exports = router;
