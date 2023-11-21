const axios = require('axios');
const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express ();
app.use(express.json());

const createalarmurl = "api.amazonalexa.com/v1/alerts/alarms";

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

app.get("/status", (request, response) => {
        const status = {
        "Status": "Running"
    };
    
    response.send(status);
});

app.post("/alarm", (request, response) => {
    data = request.body;
    console.log(data);

    if (data.hasOwnProperty('ISOTimes')){
        let alarm_array = data.ISOTimes;

        //Alexa API calls
        
        let response_string = "Alarms have been created for the following times:";
        let num_of_alarms = alarm_array.length;

        // for (let i in alarm_array) {
        //     axios.post(createalarmurl, {
        //         "endpointID" : "@self",
        //         "trigger" : {
        //             "scheduledTime" : alarm_array[i]
        //         },
        //         "assets" : [
        //             {
        //                 "type" : "TONE",
        //                 "assetID" : "123ABC"
        //             }
        //         ]
        //     }, {
        //         headers: {
        //             'Authorization' : '<< LWA_ACCESS_TOKEN  >>',
        //             'Content-Type' : 'application/json'
        //         }
        //     })
        // }

        for (let i in alarm_array) {
            if (i == num_of_alarms - 1){
                response_string = response_string + " and " + alarm_array[i] + ". ";
            } else {
                response_string = response_string + alarm_array[i] + ", ";
            }
        };

        response.send(response_string);


    } else {
        response.send("ISOTimes not found! Please try sending data with ISOTimes key and values in ISO 8601 format.");
    }
});