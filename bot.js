const Discord = require('discord.js');
const tokens = require('./tokens');
const client = new Discord.Client();

var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs');

//Invite link test bot https://goo.gl/yLmkAG
client.login(tokens.key);


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

const prefix = "!";
var rank;

client.on('message', msg => {
	console.log('hello');
	if (!msg.content.startsWith(prefix)) return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	//!add Miisc fpp squad
	if (command === 'add') {
		var username = args[0];
		var mode = args[1];
		var queue;

		switch (args[2]) {
			case 'solo':
				queue = 1;
				break;
			case 'duo':
				queue = 2;
				break;
			default:
				queue = 3;
		}
		var channel = msg.channel;
		scrape(username, mode, queue, channel);
	}

});


function scrape(username, mode, queue, channel) {

	var Nightmare1 = require('nightmare');
		nightmare = Nightmare1({
			show: true,
			waitTimeout: 3000 // in ms
		});

	if(mode == 'fpp') {
		nightmare
		  	.goto('https://pubg.op.gg/user/' + username)
		  	.click('#rankedStatsChkMode')
		  	.wait('#rankedStatsWrap > div.ranked-stats-wrapper__list > div:nth-child(5) > div > div:nth-child('+ queue +') > div > div > div.ranked-stats')
		  	.evaluate(function() {
		    	return document.querySelector('body')
		      	.innerHTML;
		  	})
		  	.end()
		  	.then(function(page) {
		    	fs.writeFile('page.html', page, function(err) {
		      		if (err) return console.log(err);
		      		console.log('fuck this scraping shit');
					var $ = cheerio.load(fs.readFileSync('./page.html'));


					rank = $('#rankedStatsWrap > div.ranked-stats-wrapper__list > div:nth-child(5) > div > div:nth-child(' + queue + ') > div > div > div > div > div.ranked-stats__layout.ranked-stats__layout--rank > div > div > div.ranked-stats__rank').html();

					console.log(username + ' ' + mode + ' ' + queue + ' rank ' + rank);
					return channel.send(username + ' ' + mode + ' ' + queue + ' rank ' + rank);
		    	});
		  	})
	}
	else if(mode == 'tpp') {
		nightmare
		  	.goto('https://pubg.op.gg/user/' + username)
		  	.click('#rankedStatsChkMode')
		  	.wait('#rankedStatsWrap > div.ranked-stats-wrapper__list > div:nth-child(1) > div > div:nth-child('+ queue +') > div > div > div.ranked-stats')
		  	.evaluate(function() {
		    	return document.querySelector('body')
		      	.innerHTML;
		  	})
		  	.end()
		  	.then(function(page) {
		    	fs.writeFile('page.html', page, function(err) {
		      		if (err) return console.log(err);
		      		console.log('fuck this scraping shit');
					var $ = cheerio.load(fs.readFileSync('./page.html'));


					rank = $('#rankedStatsWrap > div.ranked-stats-wrapper__list > div:nth-child(1) > div > div:nth-child(' + queue + ') > div > div > div > div > div.ranked-stats__layout.ranked-stats__layout--rank > div > div > div.ranked-stats__rank').html();

					console.log(username + ' ' + mode + ' ' + queue + ' rank ' + rank);
					return channel.send(username + ' ' + mode + ' ' + queue + ' rank ' + rank);
		    	});
		  	})
	}
}
