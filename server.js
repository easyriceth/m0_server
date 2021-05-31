const axios = require("axios")
const express = require('express')
const app = express()

let cors = require('cors')

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors())

const port = 8888

app.post('/save_RICE_INFERENCE', (req, res) => {

    let data = req.body
    if (data?.arguments?.imageURL) {
        const imageProcess = axios.post("http://103.253.75.254:4001/inference/",
            {
                image: data.arguments.imageURL
            },
        )

        imageProcess.then((response) => {
            let inspectData = {}
            if (response.data) {
                Object.keys(response.data).map((keys) => {
                    if (keys == 'whole_grain_kernel') {
                        inspectData['wholegrain_kernel'] = response.data[keys]
                    }
                    if (keys == 'whole_grain_pixel') {
                        inspectData['wholegrain_pixel'] = response.data[keys]
                    }
                    if (keys == 'grains') {
                        inspectData[keys] = response.data[keys]
                        if (Array.isArray(inspectData[keys])) {
                            inspectData[keys].map((grain, idx) => {
                                if (grain['shape'] == 'whole_grain') {
                                    inspectData[keys][idx]['shape'] = 'wholegrain'
                                } else if (grain['shape'] == 'broken_shape') {
                                    inspectData[keys][idx]['shape'] = 'broken'
                                }
                            })
                        } else {
                            inspectData[keys] = response.data[keys]
                        }
                    } else {
                        inspectData[keys] = response.data[keys]
                    }
                })
                let argument = {
                    ...data.arguments,
                    dataInference: inspectData,
                }
                axios.post("https://4skomnp9df.execute-api.ap-southeast-1.amazonaws.com/default/save_RICE_INFERENCE"
                    , {
                        arguments: argument
                    }
                ).then((data) => {
                    res.json(data.data)
                }).catch(() => {
                    res.status(400)
                    res.json('can not save data into database')
                })
            } else {
                res.status(400)
                res.json('empty result from compute api')
            }
        }).catch(() => {
            res.status(400)
            res.json('err connection to compute api')
        })
    } else {
        res.status(400)
        res.json('not found imageURL')
    }
})

app.post('/save_RICE_INFERENCE_DEV', (req, res) => {
    let data = req.body
    console.log(data)
    if (data?.arguments?.imageURL) {
        const imageProcess = axios.post("https://inference-dev.easyrice.tech/inference/",
            {
                image: data.arguments.imageURL
            },
        )

        imageProcess.then((response) => {
            let inspectData = {}
            if (response.data) {
                Object.keys(response.data).map((keys) => {
                    if (keys == 'whole_grain_kernel') {
                        inspectData['wholegrain_kernel'] = response.data[keys]
                    }
                    if (keys == 'whole_grain_pixel') {
                        inspectData['wholegrain_pixel'] = response.data[keys]
                    }
                    if (keys == 'grains') {
                        inspectData[keys] = response.data[keys]
                        if (Array.isArray(inspectData[keys])) {
                            inspectData[keys].map((grain, idx) => {
                                if (grain['shape'] == 'whole_grain') {
                                    inspectData[keys][idx]['shape'] = 'wholegrain'
                                } else if (grain['shape'] == 'broken_shape') {
                                    inspectData[keys][idx]['shape'] = 'broken'
                                }
                            })
                        } else {
                            inspectData[keys] = response.data[keys]
                        }
                    } else {
                        inspectData[keys] = response.data[keys]
                    }
                })
                console.log('dev to lambda')
                let argument = {
                    ...data.arguments,
                    dataInference: inspectData,
                }
                axios.post("https://4skomnp9df.execute-api.ap-southeast-1.amazonaws.com/default/Dev_save_RICE_INFERENCE"
                    , {
                        arguments: argument
                    }
                ).then((data) => {
                    res.json(data.data)
                }).catch(() => {
                    res.status(400)
                    res.json('can not save data into database')
                })
            } else {
                res.status(400)
                res.json('empty result from compute api')
            }
        }).catch(() => {
            res.status(400)
            res.json('err connection to compute api')
        })
    } else {
        res.status(400)
        res.json('not found imageURL')
    }
})

app.post('/save_RICE_INFERENCE_UAT', (req, res) => {
    let data = req.body
    console.log(data)
    if (data?.arguments?.imageURL) {
        const imageProcess = axios.post("https://inference-uat.easyrice.tech/inference/",
            {
                image: data.arguments.imageURL
            },
        )

        imageProcess.then((response) => {
            let inspectData = {}
            if (response.data) {
                Object.keys(response.data).map((keys) => {
                    if (keys == 'whole_grain_kernel') {
                        inspectData['wholegrain_kernel'] = response.data[keys]
                    }
                    if (keys == 'whole_grain_pixel') {
                        inspectData['wholegrain_pixel'] = response.data[keys]
                    }
                    if (keys == 'grains') {
                        inspectData[keys] = response.data[keys]
                        if (Array.isArray(inspectData[keys])) {
                            inspectData[keys].map((grain, idx) => {
                                if (grain['shape'] == 'whole_grain') {
                                    inspectData[keys][idx]['shape'] = 'wholegrain'
                                } else if (grain['shape'] == 'broken_shape') {
                                    inspectData[keys][idx]['shape'] = 'broken'
                                }
                            })
                        } else {
                            inspectData[keys] = response.data[keys]
                        }
                    } else {
                        inspectData[keys] = response.data[keys]
                    }
                })
                console.log('dev to lambda')
                let argument = {
                    ...data.arguments,
                    dataInference: inspectData,
                }
                axios.post("https://4skomnp9df.execute-api.ap-southeast-1.amazonaws.com/default/UAT_save_RICE_INFERENCE"
                    , {
                        arguments: argument
                    }
                ).then((data) => {
                    res.json(data.data)
                }).catch(() => {
                    res.status(400)
                    res.json('can not save data into database')
                })
            } else {
                res.status(400)
                res.json('empty result from compute api')
            }
        }).catch(() => {
            res.status(400)
            res.json('err connection to compute api')
        })
    } else {
        res.status(400)
        res.json('not found imageURL')
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})



