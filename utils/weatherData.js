const request=require('request');
const constants=require('../config');

const weatherData=(address,callback)=>{
    const url=constants.openweathermap.BASE_URL + encodeURIComponent(address) + '&appid='+constants.openweathermap.SECRET_KEY
    console.log(url);
    request({url,json:true},(error,{body})=>{
        if(error){
            callback("can't fetch the data",undefined)
        }
        else{
            callback(undefined,{
                temprature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

module.exports=weatherData