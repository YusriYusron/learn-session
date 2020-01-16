var express = require('express')

var app = express()

app.get('/', (request, response) => {
    response.sendFile(__dirname+"/views/index.html")
})

app.listen(3000, () => {
    console.log('Server started on port 3000. Please open http://localhost:3000/')
})