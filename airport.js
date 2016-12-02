
var services = require('./routes/airportServices');

module.exports = function (service) {

    service.post('/mobile/custom/airport/components', function (req, res) {
        var serviceName = req.body.service;
        console.log("Executing component service: " + serviceName);
        var service = services.getComponentService(serviceName);
        if (!service) {
           res.status(500).send("Service "+serviceName+" is not implemented in banking components API");                          
        }
        else {
            service(req.body.inputParams, req.body.outputParamNames)
              .then(function (outputParams) {
                  res.status(200).send({outputParams: outputParams});
              })
              .catch(function(error) {
                  console.info("Unexpected error calling "+serviceName+": "+error);              
                  res.status(500).send("Unexpected error calling "+serviceName+": "+error);              
              })
            
        }
    });
};
