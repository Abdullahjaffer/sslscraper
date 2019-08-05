var query = require('../../../models/query');
const mongoose =  require('mongoose')

const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
const WebSearchAPIClient = require('azure-cognitiveservices-websearch');


module.exports = function (router) {
    router.get('/',(req,res)=>{
        query.find({}).distinct('user', function(err, result) {
            res.send(result)
        });
    })
};
