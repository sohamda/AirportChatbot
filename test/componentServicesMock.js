var Promise = require("bluebird");

var airlines = require('../backend/airlines.json');
var airport = require('../backend/airport.json');

exports.getComponentService = function (name) {
   return componentServices[name];
}

var componentServices = {};

componentServices.getFlightDepartureTime = function (inputParams,outputParamNames) {
  return Promise.resolve(airlines).then(function(airlines) {
   var outputParams = {}; 
console.log(inputParams);   
   outputParams[outputParamNames[0]] = getFlightDetails(inputParams.flightNo).departureTime; 
   return outputParams;
  });
};

componentServices.getFlightCheckIn = function (inputParams,outputParamNames) {
  return Promise.resolve(airlines).then(function(airlines) {
   var outputParams = {};   
   outputParams[outputParamNames[0]] = getAirline(inputParams.flightNo).checkInURL; 
   return outputParams;
  });
};

componentServices.getFlightCheckInCounter = function (inputParams,outputParamNames) {
  return Promise.resolve(airlines).then(function(airlines) {
   var outputParams = {};   
   var checkInInfo = getFlightDetails(inputParams.flightNo).checkin;
   outputParams[outputParamNames[0]] = checkInInfo.counter; 
   outputParams[outputParamNames[1]] = checkInInfo.gate; 
   return outputParams;
  });
};

componentServices.getFlightImmigartionInfo = function (inputParams,outputParamNames) {
  return Promise.resolve(airlines).then(function(airlines) {
   var outputParams = {};   
   outputParams[outputParamNames[0]] = getFlightDetails(inputParams.flightNo).immigration; 
   return outputParams;
  });
};

componentServices.getAirportAddress = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   outputParams[outputParamNames[0]] = airport.immigration; 
   return outputParams;
  });
};

componentServices.getAirportRouteByCar = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   outputParams[outputParamNames[0]] = airport.route.car; 
   return outputParams;
  });
};

componentServices.getAirportRouteByPublicTransport = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   outputParams[outputParamNames[0]] = airport.route.public; 
   return outputParams;
  });
};

componentServices.getAirportRouteByTaxi = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   outputParams[outputParamNames[0]] = airport.route.taxi; 
   return outputParams;
  });
};

componentServices.getAirportArrival = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   outputParams[outputParamNames[0]] = airport.route.arrival; 
   return outputParams;
  });
};

componentServices.getBaggageInfo = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   outputParams[outputParamNames[0]] = airport.baggageInfo; 
   return outputParams;
  });
};

componentServices.getDelayedFlight = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   var isDelayed = false;
   airport.delayedFlights.forEach(function(eachDelayedFlight){
	   if(eachDelayedFlight === inputParams.flightNo) {
		   isDelayed = true;
	   }
   })
   outputParams[outputParamNames[0]] = isDelayed; 
   return outputParams;
  });
};

componentServices.getAllowedItems = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};    
   outputParams[outputParamNames[0]] = airport.allowed; 
   outputParams[outputParamNames[1]] = airport.regulations;
   return outputParams;
  });
};

componentServices.getIsAllowed = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};  
   var isAllowed = true;
	airport.allowed.forEach(function(allowedItem){
		if(allowedItem.code.toUpperCase() === inputParams.item.toUpperCase()) {
			isAllowed = false;
		}
	});
   outputParams[outputParamNames[0]] = isAllowed; 
   outputParams[outputParamNames[1]] = airport.regulations;
   return outputParams;
  });
};

componentServices.getNotAllowedItems = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};    
   outputParams[outputParamNames[0]] = airport.notAllowed; 
   outputParams[outputParamNames[1]] = airport.regulations;
   return outputParams;
  });
};

componentServices.getIsNotAllowed = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};  
   var isNotAllowed = false;
	airport.notAllowed.forEach(function(notAllowedItem){
		if(notAllowedItem.code.toUpperCase() === inputParams.item.toUpperCase()) {
			isNotAllowed = true;
		}
	});
   outputParams[outputParamNames[0]] = isNotAllowed;
   outputParams[outputParamNames[1]] = airport.regulations;    
   return outputParams;
  });
};



var getFlightDetails = function(flightNo) {
	var airline =  getAirline(flightNo); 
	var flight = flightNo.substring(2); 	
	var flightDetails = {};
	airline.flights.forEach(function(eachFlight) 
	{
	  console.log("Airline :" + airline.code + ", and flight :" + JSON.stringify(eachFlight));
	  if(eachFlight.code === flight) {
		  flightDetails = eachFlight;
	  }
	});
	console.log("flightDetails :" + JSON.stringify(flightDetails));
	return flightDetails;
}

var getAirline = function(flightNo) {
	console.log("Flight no:" + flightNo);
	var flightCode = flightNo.substring(0, 2); 
	var airline =  {}; 
	airlines.forEach(function(eachAirline){
		if(eachAirline.code === flightCode) {
			airline = eachAirline;
		}			
	});
	if (!airline) {
	  console.log("Airline doesn't exists, defaulting to Nothing");
	} 
	return airline;
}