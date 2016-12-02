
exports.injectMockServices = function() {
//    chatbotEngine.setMcsServices(mcsServices);
    var botconfig =   {
        "name" : "airport"
       ,"flowStorageCollection" : "AirportFlows"
       ,"defaultFlow" : "airportFlow"
//       ,"defaultFlow" : "testuiflow"
       ,"componentsApi" : "airport"
       ,"componentsApiVersion" : "1.0"
       ,"componentsEndpoint" : "components"
       ,"defaultLanguage" : "en"
      }
    // Set up mock mcsServices
    var mcsServices = require("../../chatbot/test/mcsServicesMock")
    mcsServices.setBotConfig(botconfig);
    mcsServices.addFlow(require("../airportFlow"));
//    mcsServices.addFlow(require("../Flows/testuiflow"));
    mcsServices.setComponentServices(require("../test/componentServicesMock"));    
    // instantiate chatBotEngine module with mock mcsServices
    var chatbotEngine = require("../../chatbot/impl/chatbotEngine")(mcsServices);
    return chatbotEngine;
}

exports.getViewTransactionsRuns = function(user,language,accountnr) {
var metadata = {"user": user, "language": language,"firstName" : "Soham","lastName" : "Dasgupta"};
var runs = [
  { name:"start"
   ,body: {"metadata": metadata}
  },  
  { name:"flightInfo"
   ,body: {"event":"flightDetails","metadata": metadata}
  }
];
return runs;    
}