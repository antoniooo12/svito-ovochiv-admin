const express = require('express')
const config = require('config')
const {Sequelize} = require('sequelize')
const PORT =  3200
const fileUpload = require("express-fileupload")
const xlsx = require('xlsx')
const cors = require('cors')
const path = require('path')


const app = express()
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.post('/api/db/', (req, res) => {
    res.json({message: "answer"})
})

app.listen(PORT,()=>{
    console.log(`app admin front start on ${PORT}`)
})
