const Discord = require('discord.js');
const tokens = require('./tokens');
const client = new Discord.Client();

var request = require('request'),
	cheerio = require('cheerio'),
	fs = require('fs');

//Invite link test bot https://goo.gl/yLmkAG
client.login(tokens.key);

var mainChannel,
	modChat,
	statsChat,
	Trole1,
	Trole10,
	Trole25,
	Trole50,
	Trole100,
	Trole250,
	Trole500,
	Trole1k,
	Trole2k,
	Trole5k,
	Trole10k,
	Trole25k,
	Trole50k,
 	Frole1,
	Frole10,
	Frole25,
	Frole50,
	Frole100,
	Frole250,
	Frole500,
	Frole1k,
	Frole2k,
	Frole5k,
	Frole10k,
	Frole25k,
	Frole50k;

var setupEnabled = false;


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	mainChannel = client.channels.find(n => n.name == "set-rank");
	modChat = client.channels.find(n => n.name == "mod-chat");
	statsChat = client.channels.find(n => n.name == "stats-check");
	mainGuild = client.guilds.first();
	Trole1 = mainGuild.roles.find("name", "TPP Top 1");
	Trole10 = mainGuild.roles.find("name", "TPP Top 10");
	Trole10 = mainGuild.roles.find("name", "TPP Top 25");
	Trole50 = mainGuild.roles.find("name", "TPP Top 50");
	Trole100 = mainGuild.roles.find("name", "TPP Top 100");
	Trole100 = mainGuild.roles.find("name", "TPP Top 250");
	Trole500 = mainGuild.roles.find("name", "TPP Top 500");
	Trole1k = mainGuild.roles.find("name", "TPP Top 1000");
	Trole2k = mainGuild.roles.find("name", "TPP Top 2000");
	Trole5k = mainGuild.roles.find("name", "TPP Top 5000");
	Trole10k = mainGuild.roles.find("name", "TPP Top 10k");
	Trole25k = mainGuild.roles.find("name", "TPP Top 25k");
	Trole50k = mainGuild.roles.find("name", "TPP Top 50k");

	Frole1 = mainGuild.roles.find("name", "FPP Top 1");
	Frole10 = mainGuild.roles.find("name", "FPP Top 10");
	Frole10 = mainGuild.roles.find("name", "FPP Top 25");
	Frole50 = mainGuild.roles.find("name", "FPP Top 50");
	Frole100 = mainGuild.roles.find("name", "FPP Top 100");
	Frole100 = mainGuild.roles.find("name", "FPP Top 250");
	Frole500 = mainGuild.roles.find("name", "FPP Top 500");
	Frole1k = mainGuild.roles.find("name", "FPP Top 1000");
	Frole2k = mainGuild.roles.find("name", "FPP Top 2000");
	Frole5k = mainGuild.roles.find("name", "FPP Top 5000");
	Frole10k = mainGuild.roles.find("name", "FPP Top 10k");
	Frole25k = mainGuild.roles.find("name", "FPP Top 25k");
	Frole50k = mainGuild.roles.find("name", "FPP Top 50k");

	if(mainChannel == undefined) {
		setupEnabled = true;
		console.log('command channel needs setup');
	}
	if(Trole1 == undefined) {
		setupEnabled = true;
		console.log('roles needs setup');
	}

	if(!setupEnabled) console.log('already setup');
});

const prefix = "!";
var rank;

client.on('message', msg => {

	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	//Sets up all roles and the command channel
	if((command === 'setup') && setupEnabled) {

		msg.guild.createRole({
			name: 'TPP Top 1',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role TPP Top 1'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'TPP Top 10',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role TPP Top 10'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'TPP Top 50',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role TPP Top 50'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'TTP Top 100',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role TPP Top 100'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'TPP Top 500',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role TPP Top 500'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'TPP Top 1000',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role TPP Top 1k'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'TPP Top 2000',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role TPP Top 2k'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'TPP Top 5000',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role TPP Top 5k'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'TPP Top 10000',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role TPP Top 10k'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'TPP Top 25000',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role TPP Top 25k'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'TPP Top 50000',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role TPP Top 50k'))
			.catch(console.error());



		msg.guild.createRole({
			name: 'FPP Top 1',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role FPP Top 1'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'FPP Top 10',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role FPP Top 10'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'FPP Top 50',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role FPP Top 50'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'FPP Top 100',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role FPP Top 100'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'FPP Top 500',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role FPP Top 500'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'FPP Top 1000',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role FPP Top 1k'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'FPP Top 2000',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role Top 2k'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'FPP Top 5000',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role FPP Top 5k'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'FPP Top 10000',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role FPP Top 10k'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'FPP Top 25000',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role FPP Top 25k'))
			.catch(console.error());

		msg.guild.createRole({
			name: 'FPP Top 50000',
			color: '#42e2f4',
		})
			.then(channel => console.log('Created new role FPP Top 50k'))
			.catch(console.error());





		msg.guild.createChannel('set-rank', 'text')
			.then(channel => {
				console.log('Created new channel pug-test');
			})
			.catch(console.error());

	}


	//!add Miisc fpp squad, defaults to fpp and squad if left empty
	if(msg.channel == mainChannel) {

		if (!msg.content.startsWith(prefix)) return msg.delete();
		else {
			console.log('\n\nContent:\n' + msg.content + '\n');
		}


		if (command === 'add' && args.length == 3) {
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
				case 'duo':
				queue = 2;
				break;
				case 'squad':
				queue = 3;
				break;
				default:
				return;
			}

			var channel = msg.channel;

			scrape(username, mode, queue, channel, msg);
		}
		msg.delete();
	}


	if(msg.channel == statsChat) {

		if (!msg.content.startsWith(prefix)) return;
		else {
			console.log('\n\nContent:\n' + msg.content + '\n');
		}


		if (command === 'stats' && args.length == 3) {
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
				case 'duo':
				queue = 2;
				break;
				case 'squad':
				queue = 3;
				break;
				default:
				return;
			}

			var channel = msg.channel;

			stats(username, mode, queue, channel, args[2]);
		}
	}
});


function scrape(username, mode, queue, channel, msg) {

	var member = msg.member;

	switch (mode) {
		case 'tpp':
			var child = 1;
			break;
		case 'fpp':
			var child = 5;
			break;
		default:
			return;
	}

	var Nightmare1 = require('nightmare');
		nightmare = Nightmare1({
			show: false,
			waitTimeout: 6000 // in ms
		});

		nightmare
		.goto('https://pubg.op.gg/user/' + username)
		.click('#rankedStatsChkMode')
		.wait('#rankedStatsWrap > div.ranked-stats-wrapper__list > div:nth-child(' + child + ') > div > div:nth-child(' + queue + ') > div > div > div.ranked-stats')
		.evaluate(function() {
			return document.querySelector('body')
			.innerHTML;
		})
		.end()
		.then(function(page) {
			fs.writeFile('page.html', page, function(err) {
				if (err) return console.log(err);

				var $ = cheerio.load(fs.readFileSync('./page.html'));
				rank = $('#rankedStatsWrap > div.ranked-stats-wrapper__list > div:nth-child(5) > div > div:nth-child(' + queue + ') > div > div > div > div > div.ranked-stats__layout.ranked-stats__layout--rank > div > div > div.ranked-stats__rank').text().replace(/,/g, '').replace(/#/g, '');

				console.log(username + ' ' + mode + ' ' + queue + ' rank ' + rank);

				rank = parseInt(rank);

				if(rank <= 250) modChat.send(msg.member.toString() + ' is requesting rank ' + rank + ' with this username: **' + username + '**');

			if(mode == 'fpp') {

				if(rank <= 250) return;
				else if(rank <= 500) member.addRole(Frole500);
				else if(rank <= 1000) member.addRole(Frole1k);
				else if(rank <= 2000) member.addRole(Frole2k);
				else if(rank <= 5000) member.addRole(Frole5k);
				else if(rank <= 10000) member.addRole(Frole10k);
				else if(rank <= 25000) member.addRole(Frole25k);
				else if(rank <= 50000) member.addRole(Frole50k);
				else console.log('git gud');
			}
			if(mode == 'tpp') {

				if(rank <= 250) return;
				else if(rank <= 500) member.addRole(Trole500);
				else if(rank <= 1000) member.addRole(Trole1k);
				else if(rank <= 2000) member.addRole(Trole2k);
				else if(rank <= 5000) member.addRole(Trole5k);
				else if(rank <= 10000) member.addRole(Trole10k);
				else if(rank <= 25000) member.addRole(Trole25k);
				else if(rank <= 50000) member.addRole(Trole50k);
				else console.log('git gud');
			}


			});
	})
}

function stats(username, mode, queue, channel, type) {

	switch (mode) {
		case 'tpp':
			var child = 1;
			break;
		case 'fpp':
			var child = 5;
			break;
		default:
			return;
	}

	var Nightmare1 = require('nightmare');
		nightmare = Nightmare1({
			show: false,
			waitTimeout: 6000 // in ms
		});

		nightmare
		.goto('https://pubg.op.gg/user/' + username)
		.click('#rankedStatsChkMode')
		.wait('#rankedStatsWrap > div.ranked-stats-wrapper__list > div:nth-child(' + child + ') > div > div:nth-child(' + queue + ') > div > div > div.ranked-stats')
		.evaluate(function() {
			return document.querySelector('body')
			.innerHTML;
		})
		.end()
		.then(function(page) {
			fs.writeFile('page.html', page, function(err) {
				if (err) return console.log(err);

				var $ = cheerio.load(fs.readFileSync('./page.html'));
				rank = $('#rankedStatsWrap > div.ranked-stats-wrapper__list > div:nth-child(' + child + ') > div > div:nth-child(' + queue + ') > div > div > div > div > div.ranked-stats__layout.ranked-stats__layout--rank > div > div > div.ranked-stats__rank').text().replace(/,/g, '').replace(/#/g, '');

				var adr = $('#rankedStatsWrap > div.ranked-stats-wrapper__list > div:nth-child(' + child + ') > div > div:nth-child(' + queue + ') > div > div > div > ul > li:nth-child(2) > div.ranked-stats__value.ranked-stats__value--imp').text();

				var wr = $('#rankedStatsWrap > div.ranked-stats-wrapper__list > div:nth-child(' + child +') > div > div:nth-child(' + queue + ') > div > div > div > ul > li:nth-child(3) > div.ranked-stats__value').text().trim();

				var kd = $('#rankedStatsWrap > div.ranked-stats-wrapper__list > div:nth-child(' + child + ') > div > div:nth-child(' + queue + ') > div > div > div > ul > li:nth-child(1) > div.ranked-stats__value.ranked-stats__value--imp.ranked-stats__value--great').text();

				console.log(username + ' ' + mode + ' ' + queue + ' rank ' + rank);

				rank = parseInt(rank);

			if(mode == 'fpp') {

				return statsChat.send('**Username:  **' + username + '\n\n**FPP ' + type + ' rank:  **#' + rank + '\n**Win Rate:  **' + wr + '\n**K/D:  **' + kd +'\n**ADR:  **' + adr);
			}
			if(mode == 'tpp') {

			return statsChat.send('**Username:  **' + username + '\n\n**TPP ' + type + ' rank:  **#' + rank + '\n**Win Rate:  **' + wr + '\n**K/D:  **' + kd +'\n**ADR:  **' + adr);
			}


			});
	})
}
