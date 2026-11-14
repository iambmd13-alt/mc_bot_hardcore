
const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => {
  res.write("Bot is running 24/7!");
  res.end();
}).listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'hardcorev.play.hosting',
    port: 25704,
    version: '1.21.4',
    username: 'AFK_Bot'
  });

  bot.on('spawn', () => {
    console.log('Bot connected successfully!');
    
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('end', (reason) => {
    console.log(`Bot disconnected due to: ${reason}. Reconnecting in 5 seconds...`);
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => console.log('Error:', err.message));
}

createBot();
