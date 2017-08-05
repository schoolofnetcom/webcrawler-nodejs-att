const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-hbs')
const logger = require('morgan')
const session = require('express-session')
const path = require('path')
const app = express()

app.set('views', path.join(__dirname, 'src/views'))
app.set('view engine', 'hbs')
app.set('port', 8080)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({ 
	secret: 'D&@#*(DASKJHDKH!(#&(&@',
	resave: false,
	saveUninitialized: true,
	cookie: { }
}))
app.engine('hbs', hbs.express4({
	defaultLayout: path.join(app.get('views'), 'layouts/home.hbs'),
	partialsDir  : path.join(app.get('views'), 'partials'),
	layoutsDir   : path.join(app.get('views'), 'layouts'),
}))

require('./src/routes')(app)

app.listen(app.get('port'), () => {
	console.log('Express has been started')
})

module.exports = app