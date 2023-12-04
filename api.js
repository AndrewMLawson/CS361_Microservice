const axios = require('axios');
const express = require('express');
const PORT = process.env.PORT || 8080;

const app = express ();
app.use(express.json());

const createalarmurl = "https://mandrillapp.com/api/1.0/messages/send";
const getalarms = "https://mandrillapp.com/api/1.0/messages/list-scheduled";

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

    if (data.hasOwnProperty('dateArray')){
        let alarm_array = data.dateArray;

        let reminderText = data.reminderText;
        let userEmail = data.userEmail;

        for (let i in alarm_array) {
            reminder_num = i + 1;
            axios.post(createalarmurl, {
                "key": "md-I2dKA6M8tCfJHvyuDLeHlw",
                "message": {
                    "from_email": "admin@trswebservices.net",
                    "subject": `Reminder ${reminder_num}`,
                    "text": `You have set a reminder for this time with the following message: ${reminderText}`,
                    "to": [
                        {
                            "email": userEmail,
                            "type": "to"
                        }
                    ]
                },
                "send_at": alarm_array[i]
            }, {
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
        };

        // let alarms;

        // axios.post(getalarms, {
        //     "key": "md-I2dKA6M8tCfJHvyuDLeHlw"
        // }, {
        //     headers: {
        //         'Content-Type' : 'application/json'
        //     }
        // })
        // .then(function (response){
        //     alarms = response.data;
        // });
        let response_string = "Alarm(s) have been created for the following time(s):";
        let num_of_alarms = alarm_array.length;

        for (let i in alarm_array) {
            if(num_of_alarms == 1){
                response_string = response_string + " " + alarm_array[i] + ".";
                break;
            }
            else if (i == num_of_alarms - 1){
                response_string = response_string + " and " + alarm_array[i] + ". ";
            } else {
                response_string = response_string + alarm_array[i] + ", ";
            }
        };

        // response.send(alarms);
        response.send(response_string);


    } else {
        response.send("ISOTimes not found! Please try sending data with ISOTimes key and values in ISO 8601 format.");
    };
});