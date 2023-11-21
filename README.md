# Microservice: Alexa API Handling

The microservice will be available through the web once a web-host is secured. More details are to come.

## Requesting Data

In order to send a request to the microservice, you will need to send an HTTP POST request containing JSON data.

Be sure to:
    1. Set the following headers in your request:
        - Content-Type : application/json
        - Authorization : *PUT ALEXA AUTH TOKEN HERE*
    2.  Include the relevant JSON data in the request body:
        - The API will be searching for a key called "ISOTimes", this is the only required data.

### Example

If you are using the Axios package to make API calls, the following could be used:

```
axios.post(**API URL**, {
                 "ISOTimes" : ["2023-11-20T12:00:00","2023-11-20T12:15:00","2023-11-20T12:30:00"],
                 },
                {
                 headers: {
                     'Authorization' : '<< LWA_ACCESS_TOKEN  >>',
                     'Content-Type' : 'application/json'
                 }
             })
```
***Please note: All times must conform to the ISO 8601 standard.

## Receiving Data

A status message will be returned in the response body of the call to show success of error.

<img src="./img.jpg" alt="Getting started" />