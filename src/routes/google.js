const express = require('express')
const router = express.Router()

const request = require('request')
const cheerio = require('cheerio')

router.get('/', (req, res) => {
	request('https://www.google.com.br/search?q=school+of+net&oq=school+of+net', (err, response, body) => {
		if (err || response.statusCode != 200) {
			return;
		}

		let $    = cheerio.load(body)
		let data = []

		$('.r')
			.each((key, element) => {
				
				let header = $(element).find('a').text()
				let link   = $(element).find('a').attr('href')

				data.push({
					header,
					link
				})
			})
			
		return res
				.status(200)
				.json(data)
	})
})

module.exports = router