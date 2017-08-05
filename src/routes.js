module.exports = (app) => {
	app.use('/', require('./routes/crawler'))
	app.use('/google', require('./routes/google'))
}