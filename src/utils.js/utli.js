
const request = require('postman-request')
const forcast = (lati , longi, callback)=>{


    const url = 'http://api.weatherstack.com/current?access_key=7d5bba584c2dc77a57dc7f49824405f8&query='+lati+','+longi+''
    
    request({ url, json : true },(error,{body}) =>{
        if(error){
    
            callback("unable to get weather service",undefined)
        }else if(body.error || body.current.temperature === 0){
            callback("unable to get dataaa", undefined)
        }else{
    
            let temp = body.current.temperature
            let humi =body.current.humidity
            callback(undefined,{
                temperature: temp,
                  humidity:  humi }
                  )
    
        }
    
        // console.log("it feels like " + response.body.current.feelslike)
    
        // console.log("weather description is " + response.body.current.weather_descriptions[0])
        // console.log(response.body.current)
    
    
    })
    }
    
    // forcast(0,0,(error,response)=>{
    //     console.log('error', error)
    //     console.log('response',response)
    // })
    
    module.exports = forcast
    