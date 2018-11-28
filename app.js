const Discord = require("discord.js");
const client = new Discord.Client();
const Enmap = require("enmap");
const myEnmap = new Enmap();
const DB = require("better-sqlite-pool")
client.karma = new Enmap({name: 'test' });
client.on("ready", () => {
  console.log("Rate Bot Online");
  globalreacts = 323;
  y = 0;
  if(myEnmap.isReady) { 
  console.log("Data Ready");
  }else {
  console.log("Data Not Loaded");
  }
  client.user.setActivity("Rate Bot- Front Page Coming Soon!", { type: "STREAMING", url: "https://www.twitch.tv/jamxu" })
});
client.on('messageReactionAdd', (reaction, user, message) => {
  if(reaction.emoji.name === "🔼") {
    if (user.id === reaction.message.author.id) {
      const key = `${reaction.message.author.id}`;
        client.karma.ensure(key, {
        user: reaction.message.author.id,
        karma: 0
      });
      client.karma.dec(key, "karma");
      }else
        console.log(reaction.message.author.id);
        globalreacts += 1;
        const key = `${reaction.message.author.id}`;
          client.karma.ensure(key, {
          user: reaction.message.author.id,
          karma: 0
        });
        client.karma.inc(key, "karma");
  }else
  if(reaction.emoji.name === "🔽") {
    if (user.id === reaction.message.author.id) {
      const key = `${reaction.message.author.id}`;
      client.karma.ensure(key, {
        user: reaction.message.author.id,
        karma: 0
      });
      client.karma.inc(key, "karma")
    }else
      console.log(reaction.message.author.id);
      globalreacts += 1;
      const key = `${reaction.message.author.id}`;
        client.karma.ensure(key, {
        user: reaction.message.author.id,
        karma: 0
      });
      client.karma.dec(key, "karma")
  } 
});
client.on('messageReactionRemove', (reaction, user, message) => {
    if(reaction.emoji.name === "🔼") {
      if (user.id === reaction.message.author.id) {
        const key = `${reaction.message.author.id}`;
        client.karma.ensure(key, {
          user: reaction.message.author.id,
          karma: 0
        });
        client.karma.inc(key, "karma")
      }else
        globalreacts -= 1;
        console.log(reaction.message.author.id);
        const key = `${reaction.message.author.id}`;
          client.karma.ensure(key, {
          user: reaction.message.author.id,
          karma: 0
        });
        client.karma.dec(key, "karma")
    }else
    if(reaction.emoji.name === "🔽") {
      if (user.id === reaction.message.author.id) {
        const key = `${reaction.message.author.id}`;
        client.karma.ensure(key, {
          user: reaction.message.author.id,
          karma: 0
        });
        client.karma.dec(key, "karma")
      }else
        globalreacts -= 1;
        console.log(reaction.message.author.id);
        const key = `${reaction.message.author.id}`;
          client.karma.ensure(key, {
          user: reaction.message.author.id,
          karma: 0
        });
        client.karma.inc(key, "karma")
    }
});
const prefix = "^"
client.on("message", (message) => {
function react() {
  message.react("🔽")
  globalreacts = globalreacts + 1
}
if(message.author.bot) return;
if (message.attachments.size > 0) {
    setTimeout(react, 500);
    message.react("🔼");
  }else
    if (message.content.startsWith("'")) {
      setTimeout(react,500);
      message.react("🔼");
    }else
   if (message.content.startsWith(prefix + "ping")) {
     responsetime = new Date().getTime() - message.createdTimestamp
     message.channel.send("Pong! There have been "+ globalreacts +" reacts made to date. Response Time: " + responsetime + " ms");
     console.log("Pinged");
    }else
    if (message.content.startsWith(prefix + "creator")) {
      message.channel.send("This bot was created by jam#3515");
    }else
    if (message.content.startsWith(prefix + "github")) {
      message.channel.send("<https://github.com/jamxu88/Reddicord>");
    }else
    if (message.content.startsWith(prefix + "karma")) {
    const key = `${message.author.id}`;
    try {
      message.channel.send(`You currently have ${client.karma.get(key, "karma")} karma!`);
    }
    catch(EnmapPathError) {
      message.channel.send("You have no karma!")
    }
    }else
    if (message.content.startsWith(prefix + "leaderboard")) {
      const filtered = client.karma.array();
      const sorted = filtered.sort((b, a) => a.karma - b.karma);
      const top = sorted.splice(0,10);
      const embed = new Discord.RichEmbed()
        .setTitle("Karma Leaderboard")
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x00AE86);
      for(const data of top) {
        embed.addField(client.users.get(data.user).tag, `${data.karma} karma`);
      }
      return message.channel.send({embed});
    }else
    if (message.content.startsWith(prefix + "help")) {
      message.channel.send({embed: {
      color: ffffff,
      description: "**Prefix**: `#` \n **General Commands**: \n `ping`- Ping the bot \n `creator`- Creator of this bot! \n `github`- View this bot's source code \n **Karma Commands**: \n `karma`- Check your karma \n `leaderboard`- Check the top 10 Karma Holders \n How to put Rating on a message: Start message with `'` (single quote)"
}});
    }
  });
//Just a Test Bot Token
client.login("process.env.BOT_TOKEN");
