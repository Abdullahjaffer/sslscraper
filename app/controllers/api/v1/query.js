var query = require('../../../models/query');
const mongoose =  require('mongoose')
const CognitiveServicesCredentials = require('ms-rest-azure').CognitiveServicesCredentials;
const WebSearchAPIClient = require('azure-cognitiveservices-websearch');
var ssllabs = require("node-ssllabs");
var request = require("request");
var linkify = require("linkifyjs")

function wordInString(s, word){
  return new RegExp( '\\b' + word + '\\b', 'i').test(s);
}

function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
      hostname = url.split('/')[2];
  }
  else {
      hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return 'http://'+hostname;
}

function saver(arr,x,y,cb){
  console.log(y)
  for(let i = 0; i < arr.length;i++){
    if(arr[i].url[4] !== 's'){
      let url = arr[i].url;
      
      console.log(arr[i].url)
      let Query = new query({
        _id: new mongoose.Types.ObjectId(),
        url: extractHostname(url),
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
router.post('/getEmails',(req,res)=>{
  request({
    uri: req.body.url
  }, function(error, response, body) {
    if(error){
      res.status(401).send(error)
    }else{
      let x = body
      console.log(body)
      x = x.replace(/</gi ,' ')
      x = x.replace(/>/gi ,' ')
      let y = linkify.find(x)
      let temp = []
      let tempMail =[]
      y.forEach(element => {
        if(wordInString(element.href,req.body.url.split('.')[1])
        &&element.type=='url'
        &&!wordInString(element.href,'.css')
        &&!wordInString(element.href,'.js')
        &&!wordInString(element.href,'.xml')
        &&!wordInString(element.href,'.jpg')
        &&!wordInString(element.href,'.jpeg')
        &&!wordInString(element.href,'.png')
        &&(wordInString(element.href,'contact')
        ||wordInString(element.href,'Contact')
        ||wordInString(element.href,'call')
        ||wordInString(element.href,'Call')
        ||wordInString(element.href,'Info')
        ||wordInString(element.href,'info'))
        ){
          temp = [...temp, element]
        }
        if(element.type=='email'){
          tempMail=[...tempMail,element.value]
        }
      });
      distTemp = [... new Set(temp.map(x=>x.href))]
      distTemp.forEach(element => {
        request({
          uri: element,
        }, function(error, response, body) {
          if(error){
            res.status(401).send('error')
          }else{
            let x = linkify.find(body)
            x.forEach(k=>{
              if(k.type == 'email'){
                tempMail=[...tempMail,k.value]
              }
            })
          }
        })
      })
      res.json({
        temp,
        distTemp,
        tempMail
      })
      query.findOneAndUpdate({user : req.userData, url : req.body.url},{emails: tempMail},{new: true},(err,doc)=>{
        if(doc){
          // res.send(doc)
        }
        else{
          // res.send(err)
        }
      })
    }
  });
})
};
