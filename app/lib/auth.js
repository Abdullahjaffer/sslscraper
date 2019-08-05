module.exports = function() {
  return (req, res, next)=>{
    try{
        req.userData = req.headers.authorization.split(' ')[1];
        next();
    }
    catch(err){
        res.json({
            Status: 'false',
            Reason: "auth failed from auth"
        });
    }
}
};
