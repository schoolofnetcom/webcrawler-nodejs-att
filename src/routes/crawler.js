const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('crawler/index', {
		title: 'WEB Crawler',
		msg: 'Welcome to Web Crawler'
	})
})

router.post('/', (req, res) => {
	if (!req.body.search_term) {
		return res.redirect('/')
	}

	let search_term = req.body.search_term.split(' ').join('+')
	
	request(`https://www.google.com.br/search?q=${search_term}&oq=${search_term}`, (err, response, body) => {
		if (err || response.statusCode != 200) {
			return res.redirect('/')
		}

		let $    = cheerio.load(body)
		let data = []

		$('.r')
			.each((key, element) => {
				
				let header = $(element).find('a').text()
				let link   = 'https://www.google.com/' + $(element).find('a').attr('href')

				data.push({
					header,
					link
				})
			})

		if (!data.length) {
			return res.redirect('/')
		}

		req.session.result_data = data

		return res.redirect('/result')
	})
})

router.get('/result', (req, res) => {
	let result = req.session.result_data

	req.session.result_data = []

	return res.render('crawler/result', {
		data: result
	})
})

module.exports =  router