const axios = require("axios")
const express = require('express')
const app = express()

let cors = require('cors')

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())

const port = 8888
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//app.use(cors())

app.post('/save_RICE_INFERENCE', (req, res) => {

    
    let data = req.body

    console.log(data)
    const imageProcess = axios.post("http://103.253.75.254:4001/inference/", 
    {
        //headers: {"Access-Control-Allow-Origin": "*"},
        image: data.arguments.imageURL
    },
   // headers: {"Access-Control-Allow-Origin": "*"}
    )
    imageProcess.then((response) => {
        let inspectData = response.data
        console.log(inspectData)
        let argument = {
            ...data.arguments,
            dataInference: inspectData,
        }
        axios.post("https://4skomnp9df.execute-api.ap-southeast-1.amazonaws.com/default/save_RICE_INFERENCE"
            , {
                arguments: argument
            }
        ).then((data) => {
            console.log(data.data)
            res.json(data.data)
        }).catch(()=>{
                res.json(argument)
        })
    }).catch((err)=>{
        console.log('err')
        console.log(err)
        res.json(err)
    })
    
   // let data = 
   // setTimeout(()=>{
    //   res.json(data)
   // },24000)
//    res.json({'name' : 'helloworld'})
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



