var query = require('../../../models/query');

module.exports = function (router) {
    router.get('/',(req,res)=>{
        query.find({}).distinct('user', function(err, result) {
            res.send(result)
        });
    })
};
