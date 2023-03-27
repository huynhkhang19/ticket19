const fs = require('fs');
const discord = require('discord.js');

async function initCommands(client, interaction) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        if (command.adminOnly === true && !interaction.member.permissions.has('Administrator')) return interaction.reply({ content: 'Bạn không có quyền cho việc này.', ephemeral: true });
        await command.run(client, interaction);
    } catch (err) {
        console.error(err);
        const errorEmbed = new discord.EmbedBuilder()
            .setDescription(`**ERRO:** ${error}`)
            .setColor('#03EEFF')
            .setTimestamp()
            .setFooter({ text: 'Decx © 2022', iconURL: 'https://cdn.discordapp.com/attachments/1081120336290009148/1089708825168318474/logo2.png' });

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

async function initInteractionButtons(client, interaction) {
    if (interaction.isButton()) {
        const load = async dirs => {
            const buttons = fs.readdirSync(`./src/buttons/${dirs}/`).filter(f => f.endsWith('.js'));
            for (const file of buttons) {
                const button = require(`../../buttons/${dirs}/${file}`);
                const customId = button.config.customId;
                if(!customId) return;
                if (customId === interaction.customId) {
                    button.run(client, interaction);
                }
            }
        };
        fs.readdirSync(`./src/buttons`).forEach(x => load(x));
    }
}

async function initInteractionSelectMenu(client, interaction) {
    if (interaction.isSelectMenu()) {
        const load = async dirs => {
            const menus = fs.readdirSync(`./src/selectMenus/`).filter(f => f.endsWith('.js'));
            for (const file of menus) {
                const menu = require(`../../selectMenus/${file}`);
                const customId = menu.config.customId;
                if (!customId) return;
                if (customId === interaction.customId) {
                    menu.run(client, interaction);
                }
            }
        };
        fs.readdirSync(`./src/selectMenus`).forEach(x => load(x));
    }
}

module.exports = async (client, interaction) => {
    await initCommands(client, interaction);
    await initInteractionSelectMenu(client, interaction);
    await initInteractionButtons(client, interaction);
};
