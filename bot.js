const Discord = require('discord.js');
const tokens = require('./tokens');
const client = new Discord.Client();

var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs');

//Invite link test bot https://goo.gl/yLmkAG
client.login(tokens.key);

var mainChannel;
var role10;
var role50;
var role100;
var role500;
var role1k;
var setupEnabled = false;


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	mainChannel = client.channels.find(n => n.name == "set-rank");
	mainGuild = client.guilds.first();
	role10 = mainGuild.roles.find("name", "Top 10");
	role50 = mainGuild.roles.find("name", "Top 50");
	role100 = mainGuild.roles.find("name", "Top 100");
	role500 = mainGuild.roles.find("name", "Top 500");
	role1k = mainGuild.roles.find("name", "Top 1000");

	if(mainChannel == undefined) {
		setupEnabled = true;
		console.log('command channel needs setup');
	}
	if(role10 == undefined) {
		setupEnabled = true;
		console.log('role10 needs setup');
	}
	if(role50 == undefined) {
		setupEnabled = true;
		console.log('role50 needs setup');
	}
	if(role100 == undefined) {
		setupEnabled = true;
		console.log('role100 needs setup');
	}
	if(role500 == undefined) {
		setupEnabled = true;
		console.log('role500 needs setup');
	}
	if(role1k == undefined) {
		setupEnabled = true;
		console.log('role1k needs setup');
	}
	else console.log('already setup');
});

const prefix = "!";
var rank;

client.on('message', msg => {
	console.log('hello');
	if (!msg.content.startsWith(prefix)) return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	//Sets up all roles and the command channel
	if((command === 'setup') && setupEnabled) {

		msg.guild.createRole({
			name: 'Top 10',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role Top 10'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'Top 50',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role Top 50'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'Top 100',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role Top 100'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'Top 500',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role Top 500'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'Top 1000',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role Top 1000'))
			.catch(console.error());

		msg.guild.createChannel('set-rank', 'text')
			.then(channel => console.log('Created new channel pug-test'))
			.catch(console.error());

	}


	//!add Miisc fpp squad
	if (command === 'add' && msg.channel == mainChannel) {
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
