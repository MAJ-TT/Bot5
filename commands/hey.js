module.exports = {
    data: {
        name: 'hey',
        description: 'Responds with hey!',
    },

    execute: async interaction => {
        await interaction.reply('Hey!');
    }
}