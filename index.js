const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running 24/7!\n');
}).listen(process.env.PORT || 3000);

function createBot() {
  const bot = mineflayer.createBot({
    host: 'hardcorev.play.hosting',
    port: 25797,
    version: false,
    username: 'HardcorevBot'
  });

  bot.on('spawn', () => {
    console.log('Bot connected successfully!');
    
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked from server:', reason);
  });

  bot.on('end', (reason) => {
    console.log(`Bot disconnected due to: ${reason}. Reconnecting in 5 seconds...`);
    setTimeout(createBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('Connection error:', err.message);
  });
}

createBot();
