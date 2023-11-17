const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: {
        name: 'help',
        description: 'Displays Help Menu.',
        },

    execute: async interaction => {
        const row = new MessageActionRow()
            .addComponents(
                 new MessageButton()
                    .setCustomId('hey')
                    .setLabel('Hey Command')
                    .setStyle('PRIMARY')
             );

                new MessageButton()
                .setCustomId('ping')
                .setLabel('Ping Command')
                .setStyle('PRIMARY')

        await interaction.reply({
            content: 'Choose a command:',
            components: [row]
        });

    },
};