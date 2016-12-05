var Promise = require("bluebird");

var airlines = require('../backend/airlines.json');
var airport = require('../backend/airport.json');

var airportFlow = require('../airportFlow.json');

exports.getComponentService = function (name) {
   return componentServices[name];
}

var componentServices = {};

componentServices.getFlightDepartureTime = function (inputParams,outputParamNames) {
  return Promise.resolve(airlines).then(function(airlines) {
   var outputParams = {};   
   outputParams['departureTime'] = getFlightDetails(inputParams.flightNo.toUpperCase()).departureTime; 
   return outputParams;
  });
};

componentServices.getIsFlightDelayed = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   var isDelayed = false;
   airport.delayedFlights.forEach(function(delayedFlight){
	   if(delayedFlight.code.toUpperCase() === inputParams.flightNo.toUpperCase()) {
			isDelayed = true;
			
	   }
   });
   console.log("isDelayed :" + isDelayed);
   outputParams['isDelayed'] = isDelayed ; 
   console.log("outputParams :" + JSON.stringify(outputParams));
   return outputParams;
  });
};

componentServices.getFlightCheckIn = function (inputParams,outputParamNames) {
  return Promise.resolve(airlines).then(function(airlines) {
   var outputParams = {};   
   outputParams['checkInURL'] = getAirline(inputParams.flightNo.toUpperCase()).checkInURL; 
   return outputParams;
  });
};

componentServices.getFlightCheckInCounter = function (inputParams,outputParamNames) {
  return Promise.resolve(airlines).then(function(airlines) {
   var outputParams = {};   
   var checkInInfo = getFlightDetails(inputParams.flightNo.toUpperCase()).checkin;
   outputParams['counter'] = checkInInfo.counter; 
   outputParams['gate'] = checkInInfo.gate; 
   return outputParams;
  });
};

componentServices.getFlightImmigartionInfo = function (inputParams,outputParamNames) {
  return Promise.resolve(airlines).then(function(airlines) {
   var outputParams = {};   
   outputParams['immigration'] = (getFlightDetails(inputParams.flightNo.toUpperCase()).immigration === "true"); 
   return outputParams;
  });
};

componentServices.getAirportAddress = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   outputParams['address'] = airport.address; 
   return outputParams;
  });
};

componentServices.getAirportRouteByCar = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   outputParams['car'] = airport.route.car; 
   return outputParams;
  });
};

componentServices.getAirportRouteByPublicTransport = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   outputParams['public'] = airport.route.public; 
   return outputParams;
  });
};

componentServices.getAirportRouteByTaxi = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   outputParams['taxi'] = airport.route.taxi; 
   return outputParams;
  });
};

componentServices.getAirportArrival = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   outputParams['arrival'] = airport.route.arrival; 
   return outputParams;
  });
};

componentServices.getBaggageInfo = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};   
   outputParams['baggageInfo'] = airport.baggageInfo; 
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
   outputParams['isDelayed'] = isDelayed; 
   return outputParams;
  });
};

componentServices.getAllowedItems = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};    
   outputParams['allowed'] = airport.allowed; 
   outputParams['regulations'] = airport.regulations;
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
   outputParams['isAllowed'] = isAllowed; 
   outputParams['regulations'] = airport.regulations;
   return outputParams;
  });
};

componentServices.getNotAllowedItems = function (inputParams,outputParamNames) {
  return Promise.resolve(airport).then(function(airport) {
   var outputParams = {};    
   outputParams['notAllowed'] = airport.notAllowed; 
   outputParams['regulations'] = airport.regulations;
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
   outputParams['isNotAllowed'] = isNotAllowed;
   outputParams['regulations'] = airport.regulations;    
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