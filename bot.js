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
			.then(channel => {
				console.log('Created new channel pug-test');
			})
			.catch(console.error());
	}

	if(msg.channel == mainChannel) {

		//Deletes anything that doesn't start with a prefix and logs the others
		if (!msg.content.startsWith(prefix)) return msg.delete();
		else console.log('\n\nContent:\n' + msg.content + '\n');

		//!add Miisc fpp squad, defaults to fpp and squad if left empty
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
			scrape(username, mode, queue, msg.member);
		}
		msg.delete();
	}
});


function scrape(username, mode, queue, member) {

	switch (mode) {
		case 'tpp':
			mode = 'tpp';
			var child = 1;
			break;
		default:
			mode = 'fpp';
			var child = 5;
	}

	var Nightmare1 = require('nightmare');
		nightmare = Nightmare1({
			show: true,
			waitTimeout: 3000 // in ms
		});

		nightmare
		.goto('https://pubg.op.gg/user/' + username)
		.click('#rankedStatsChkMode')
		.wait('#rankedStatsWrap > div.ranked-stats-wrapper__list > div:nth-child(' + child + ') > div > div:nth-child('+ queue +') > div > div > div.ranked-stats')
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
				if(rank <= 10) member.addRole(role10);
				else if(rank <= 50) member.addRole(role50);
				else if(rank <= 100) member.addRole(role100);
				else if(rank <= 500) member.addRole(role500);
				else if(rank <= 10000000) member.addRole(role1k);
				else console.log('git gud');

			});
	})
}
