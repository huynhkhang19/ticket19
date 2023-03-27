const discord = require('discord.js');

module.exports = {
    config: {
        customId: 'ticketMenu',
    },
    run: async (client, interaction) => {
        const guild = client.guilds.cache.get(interaction.guild.id);
        const guildChannels = guild.channels.cache;
        const ticketChannelName = `ticket-${interaction.user.username.toLowerCase()}`;

        const errorEmbed = new discord.EmbedBuilder()
            .setDescription('Bạn đã có một ticket đang hoạt động! Vui Lòng Đóng cái hiện tại để mở cái mới.')
            .setColor('2F3136')

        for (const channel of guildChannels.values()) {
            if (channel.name.startsWith('ticket')) {
                let ticketOwnerId = channel.topic;
                if (ticketOwnerId === interaction.user.id) {
                    return interaction.reply({ ephemeral: true, embeds: [errorEmbed] });
                }
            }
        }

        const ticketChannel = await guild.channels.create({
            name: `${ticketChannelName}`,
            type: discord.ChannelType.GuildText,
            //parent: '1053478895766208614',
            topic: `${interaction.user.id}`,
            permissionOverwrites: [
				{
					id: interaction.user.id,
					allow: [discord.PermissionFlagsBits.SendMessages, discord.PermissionFlagsBits.ViewChannel],
				},
				{
					id: interaction.guild.roles.everyone,
					deny: [discord.PermissionFlagsBits.ViewChannel],
                },
            ],
        });


        let ticketOption = '';

        if (interaction.values[0] === 'questionOption') {
            ticketOption = 'Tạo Ticket.';
        } else if (interaction.values[0] === 'buyOption') {
            ticketOption = 'Bảo Hành.';
        }

        const ticketMenuEmbed = new discord.EmbedBuilder()
            .setAuthor({
                name: "Ticket Support",
                url: "https://example.com",
                iconURL: "https://cdn.discordapp.com/attachments/1081120336290009148/1089708825168318474/logo2.png",
              })
              .setDescription("Vui lòng đợi <@&1076516924147634206> trong giây lát nha\n\n`Auto buy tại:`\nhttps://masewstore.xyz/\n> Web Unban FiveM & Server, Nitro, Netflix Giá Rẻ Thanh Toán Tự Động 24/7")
            .addFields([
                {
                    name: '**DANH MỤC HỖ TRỢ : **',
                    value: `\`${ticketOption}\``,
                    inline: true,
                }
            ])
            .setImage("https://cdn.discordapp.com/attachments/1081120336290009148/1089708719278927882/standard.gif")
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setThumbnail("https://cdn.discordapp.com/attachments/1081120336290009148/1089708825168318474/logo2.png")  
            .setColor("#00b0f4")
            .setFooter({
                text: "https://discord.gg/masewstore",
                iconURL: "https://cdn.discordapp.com/attachments/1081120336290009148/1089708825168318474/logo2.png",
              });
        const ticketButtonsPainel = new discord.ActionRowBuilder()
            .addComponents(
                new discord.ButtonBuilder()
                    .setCustomId('endTicket')
                    .setLabel('Đóng Ticket')
                    .setStyle('Secondary')
            )
        await ticketChannel.send({ embeds: [ticketMenuEmbed], content: `Xin Chào ||<@${interaction.user.id}>||`, components: [ticketButtonsPainel] });

        const sucessEmbed = new discord.EmbedBuilder()
            .setDescription('Vé của bạn đã tạo thành công.')
            .setColor('#2f3136')

        const goToTicketChannelButton = new discord.ActionRowBuilder()
            .addComponents(
                new discord.ButtonBuilder()
                    .setLabel('Đi đến vé')
                    .setURL(ticketChannel.url)
                    .setStyle('Click Tại Đây')
            )

        await interaction.reply({embeds: [sucessEmbed], components: [goToTicketChannelButton], ephemeral: true});

    },
}