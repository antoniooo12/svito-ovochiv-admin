const express = require('express')
const path = require('path')
const cors = require('cors')

const PORT = 3020

const app = express()
app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'build')))
const corsOptions = {
    // origin: 'http://localhost:3020',
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('*/*/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('**', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(PORT, () => {
    console.log(`server run ${PORT}`)
})