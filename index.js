const http = require('http');
const mineflayer = require('mineflayer');

const PORT = process.env.PORT || 10000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running 24/7!\n');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[OK] HTTP server is listening on 0.0.0.0:${PORT}`);
  startBot();
});

function startBot() {
  console.log('Attempting to connect to Minecraft server...');
  
  const bot = mineflayer.createBot({
    host: 'hardcorev.play.hosting',
    port: 25797,
    version: false,
    username: 'AFK_Bot'
  });

  bot.on('spawn', () => {
    console.log('Bot connected successfully to the game!');
    
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 30000);
  });

  bot.on('kicked', (reason) => {
    console.log('Kicked from server:', reason);
  });

  bot.on('end', (reason) => {
    console.log(`Bot disconnected: ${reason}. Reconnecting in 10 seconds...`);
    setTimeout(startBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Connection error:', err.message);
  });
}
