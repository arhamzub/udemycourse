// const request = require('postman-request')
// const forcast = (lati , longi, callback)=>{

// const url = 'http://api.weatherstack.com/current?access_key=7d5bba584c2dc77a57dc7f49824405f8&query='+lati+','+longi+''

// request({ url: url, json : true },(error,response) =>{

//     let temp = response.body.current.temperature
//     let humi = response.body.current.humidity

//     if(error){

//         return("unable to get weather service",undefined)
//     }else if(response.body.current.temperature.length === 0){
//         return("unable to get dataaa", undefined)
//     }else{

//         callback(undefined,"it is currently " + temp  + " degress out and humidity is " + humi )

//     }

//     // console.log("it feels like " + response.body.current.feelslike)

//     // console.log("weather description is " + response.body.current.weather_descriptions[0])
//     // console.log(response.body.current)

// })
// }

// forcast(0,0,(error,response)=>{
//     console.log('error', error)
//     console.log('response',response)
// })

// // module.exports = forcast

// ============================================>>>>>>>..

const request = require("postman-request");

const geo = function (address, callback) {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=f023278e4043db090072456e256eef93&query=" +
    address +
    "Lo&limit=1 ";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.error || body.data[0] === undefined) {
      console.log("boddy error=---->" + body.error);

      callback("error in the location format ", undefined);
    } else {
      //     const lati = response.body.data[0].latitude
      //     const longi = response.body.data[0].longitude

      //     console.log(address + "latitude : " + lati + "longitude: " + longi)
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].label,
        continent: body.data[0].continent,
      });
    }
  });
};

module.exports = geo;
// =======================================>>>>>
