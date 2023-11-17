module.exports = {
    data: {
        name: 'ping',
        discription: 'Responds with pong!',
    },
    execute: async interaction => {
        await interaction.reply('Pong! Latency is ${Date.now() - interaction.createdTimestamp}ms.');
    },
};