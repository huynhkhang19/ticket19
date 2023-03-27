const discord = require('discord.js');

module.exports = {
    config: {
        customId: 'endTicket',
    },
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: 'Bạn không có quyền cho việc này.', ephemeral: true });

        const sucessEmbed = new discord.EmbedBuilder()
        .setDescription('Ticket sẽ được đóng trong **10S**.')
        .setColor('#03EEFF')

        interaction.deferReply();
        interaction.deleteReply();

        interaction.channel.send({embeds: [sucessEmbed]});

        setTimeout(() => {
            try {
                interaction.channel.delete();
            } catch (err) {
                console.log(err);
                return;
            }
        }, 10000);

    },
}