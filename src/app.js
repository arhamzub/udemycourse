// const request = require('postman-request')
const path = require('path') 
const express = require('express')
const hbs = require('hbs')

const geo = require('./utils.js/forcast')
const forcast = require('./utils.js/utli')
const app = express()

const port = process.env.PORT || 3000

// console.log(path.join(__dirname,'../public'))
// define paths for express config.....
const publicDirectoryPath =path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// setup handlebars engine and views location....
app.set('views' , viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve/....

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'weather app'  ,
        name: 'Arham Zubair'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about me',
        name : 'Arham Zubair'
    })
})

app.get('/about/*',(req,res) => {

    res.render('404',{
        title: '404',
        name : 'Arham Zubair',
        errorMessage: 'about data not found...'
    })

})
// app.get('/about/*',(req,res)=>{
//     res.send('about data not found')
// })

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'how may i help you',
        name : 'Arham Zubair'
    })
})
app.get('/help/*',(req,res) => {

    res.render('404',{
        title: '404',
        name : 'Arham Zubair',
        errorMessage: 'help article not found...'
    })

})

// app.get('/help/*',(req,res)=>{
//     res.send('help data not found')
// })
// app.get('',(req,res)=>{
//     res.send('<h1>hello express</h1>')
// // })
// app.get('/help',(req,res)=>{

//     res.send([{
//         name: 'arham',
//         age: 22
//     },{
//         name: 'zubair',
//         }])

// // })
// app.get('/about',(req,res)=>{

//     res.send({
//         forcast : 34,
//         location : 'lahore,punjab,pakistan'

//     })

// })
app.get('/weather',(req,res)=>{

    if(!req.query.address){

        return res.send({
            error : 'you must provide an address'
        })

    }

    geo(req.query.address,(error,{latitude,longitude,location,continent}={})=>{

        if(error){
            return res.send({error})
        }

        forcast(latitude,longitude,(error,forcastdata)=>{
            if(error){
                return res.send({error})
            }
             res.send({
        forcast : forcastdata,
        location,
        continent,
        address: req.query.address

    })
        })

    })
    // res.send({
    //     forcast : 34,
    //     location : 'lahore,punjab,pakistan',
    //     address: req.query.address

    // })

})
app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })

    }



console.log(req.query.search)
    res.send({
        products: []
    })

})

app.get('/weather/*',(req,res) => {

    res.render('404',{
        title: '404',
        name : 'Arham Zuabir',
        errorMessage: 'weather data not found...'
    })

    })
// app.get('/weather/*',(req,res)=>{

//     res.send('weather data not found')

// })
// app.com
// app.com/help
// app.com/about

app.get('*',(req,res) => {

    res.render('404',{
        title: '404',
        name : 'Arham Zubair',
        errorMessage: 'page not found...'
    })

})
app.listen(port,()=>{
    console.log('server is up on port '+port)
})