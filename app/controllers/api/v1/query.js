var query = require('../../../models/query');
const mongoose =  require('mongoose')
var request = require('request');
const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
const WebSearchAPIClient = require('azure-cognitiveservices-websearch');
var ssllabs = require("node-ssllabs");

function saver(arr,x,y,cb){
  console.log(y)
  for(let i = 0; i < arr.length;i++){
    if(arr[i].url[4] !== 's'){
      console.log(arr[i].url)
      let Query = new query({
        _id: new mongoose.Types.ObjectId(),
        url: arr[i].url,
        title: arr[i].name,
        search: x,
        user: y
      })
      Query.save().then((data)=>{
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
  cb();
}
module.exports = function (router) {
  router.get('/:query/:limit/:offset/:market',(req,res)=>{
    let credentials = new CognitiveServicesCredentials('cabfefaee99e4d2a952b54861e351162');
    let webSearchApiClient = new WebSearchAPIClient(credentials);
    webSearchApiClient.web.search(req.params.query,{
      user: req.userData,
      count: parseInt(req.params.limit),
      offset: parseInt(req.params.offset),
      market: req.params.market,
      adult: 'Moderate'
    }).then((result) => {
      saver(result.webPages.value,req.params.query,req.userData,()=>{
        res.send(result)
      })
      
  }).catch((err) => {
      throw err;
  })
  })
  router.get('/getlistname',(req,res)=>{
    query.find({user: req.userData}).distinct('search', function(err, result) {
      res.send(result)
  });
  })
  router.get('/getlist/:search',(req,res)=>{
    query.find({user : req.userData, search : req.params.search},null,{sort: {updatedAt: -1}},(err,result)=>{
      res.send(result)
    })
  })
  router.post('/save',(req,res)=>{
    var conditions = { user : req.userData, _id : req.body._id }
  , update = { contacted: req.body.contacted, responded: req.body.responded}
  , options = { multi: true };

query.update(conditions, update, options, callback);

function callback (err, numAffected) {
  if(numAffected)
  res.send("saved")
}
  })
  router.post('/delete', (req,res)=>{
    query.remove({ user : req.userData, _id : req.body._id },(err, doc)=>{
        if(err || !doc){
            res.send(200, 'false');
        }
        else{
            res.send(doc)
        }
    })
});
router.get('/ssltest/:weburl',(req,res)=>{
  ssllabs.scan(req.params.weburl, function (err, host) {
    res.send(host)
  });
})
router.delete('/:search',(req,res)=>{
  query.remove({user: req.userData, search: req.params.search},(err,data)=>{
    res.send(data);
  })
})
};
