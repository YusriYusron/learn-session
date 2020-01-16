var express = require('express')
var bodyParser = require('body-parser')
var expressSession = require('express-session')

var session

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(expressSession({
    secret: '219!(!@J#J#(($Jhqo!0387G!^#habsh*!(AT!@#EN!@G',
    resave: false,
    saveUninitialized: true
}))

app.get('/', (request, response) => {
    session = request.session
    if (session.uniqueID) {
        response.redirect('/redirect')
    }
    response.sendFile(__dirname+"/views/index.html")
})

app.post('/', (request, response) => {
    session = request.session
    if (session.uniqueID) {
        response.redirect('/redirect')
    }

    if (request.body.username == 'admin' && request.body.password == 'admin'){
        session.uniqueID = request.body.username
    }
    
    response.redirect('/redirect')
})

app.get('/admin', (request, response) => {
    session = request.session
    if (session.uniqueID != 'admin'){
        response.redirect('/')
    } else {
        response.send('Selamat Datang Admin <a href="/logout">Logout</a>')
    }
})

app.get('/redirect', (request, response) => {
    session = request.session
    if (session.uniqueID == 'admin'){
        response.redirect('/admin')
    } else {
        response.redirect('/')
    }
})

app.get('/logout', (request, response) => {
    request.session.destroy()
    response.redirect('/')
})

app.get('*', (request, response) => {
    response.send('404 Not Found')
})

app.listen(3000, () => {
    console.log('Server started on port 3000. Please open http://localhost:3000/')
})