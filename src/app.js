const express=require("express");
const hbs=require("hbs");
const path=require("path");


const app=express();

const weatherData=require('../utils/weatherData');
const port=process.env.PORT||3000

const publicStaticDirPath=path.join(__dirname,"../public")
const viewPath=path.join(__dirname,"../template/views")
const partialsPath=path.join(__dirname,"../template/partials")

app.set('view engine','hbs');
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicStaticDirPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App'
    })
})

app.get('/weather',(req,res)=>{
    const address= req.query.address
    if(!address){
        return res.send({
            error:"you must enter address in search text box"
        })
    }
    weatherData(address,(error,{temprature,description,cityName}={})=>{
        if(error){
            return res.send({error})
        }
        console.log(temprature,description,cityName)
        res.send({
            temprature,
            description,
            cityName
        })
    })
})
app.get("*",(req,res)=>{
    res.render('404',{
        title: "page not found"
    })
})
app.listen(port,()=>{
    console.log("Server is running on port : ",port)
})