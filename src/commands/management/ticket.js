const discord = require('discord.js');
const { read } = require('fs');
const { ticketChannelId } = require('../../config/config.json');


module.exports = {
    name: 'ticket',
    description: 'Tạo tin nhắn vé.',
    type: discord.ApplicationCommandType.ChatInput,
    adminOnly: true,
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has('Administrator')) return interaction.reply({ content: 'Bạn không có quyền cho việc này.', ephemeral: true });
        const ticketChannel = client.channels.cache.find(channel => channel.id === ticketChannelId);
        if (interaction.channel.id !== ticketChannelId) return interaction.reply({ content: `Bạn không thể sử dụng lệnh này trong cuộc trò chuyện này. sử dụng ${ticketChannel}` });
         
        const embed = new discord.EmbedBuilder()
        .setAuthor({ 
            name: "Ticket Support",
            iconURL: "https://cdn.discordapp.com/attachments/1081120336290009148/1089708825168318474/logo2.png",
        })
        .setColor(0x0099FF)
            .setTitle('Chọn các danh mục để được hỗ trợ !!')
            .setDescription(`** ( 📩 Mua hàng  )

            + Khi mua vui lòng nói món hàng và phương thức thanh toán
            + Hãy cung cấp đầy đủ yêu cầu mà món hàng cần có
          
            ( 🔑 Bảo Hành  )
            
            + Khi món hàng của bạn gặp vấn đề như lỗi, die hoặc vấn đề khác.
            + Rồi hãy tạo đơn ở đây cũng như nói ra các lý do và bằng chứng
            + Shop sẽ phản hồi bạn sau vài  phút nhiều nhất 24h 
             **`)
            .setThumbnail('https://cdn.discordapp.com/attachments/1081120336290009148/1089708825168318474/logo2.png')
            .setImage('https://cdn.discordapp.com/attachments/1081120336290009148/1089708719278927882/standard.gif')
            .setFooter({
                text: "https://discord.gg/masewstore",
                iconURL: "https://cdn.discordapp.com/attachments/1081120336290009148/1089708825168318474/logo2.png",
              })
            .setTimestamp();
        const ticketRow = new discord.ActionRowBuilder()
            .addComponents(
                new discord.SelectMenuBuilder()
                    .setCustomId('ticketMenu')
                    
                    .setPlaceholder('Chọn Danh Mục Để Được Hỗ Trợ')
                    .addOptions(
                        {
                            label: '📩 Mua Hàng',
                            description: 'Ấn Vào Đây Để Tạo Ticket Để Mua Hàng ',
                            value: 'questionOption',
                        },
                        {
                            label: '🔑 Bảo Hành ',
                            description: 'Ấn Vào Đây Để Bảo Hành Các Dịch Vụ Bị Lỗi',
                            value: 'buyOption',
                        },
                    )
            );

        interaction.deferReply();
        interaction.deleteReply();
        return await ticketChannel.send({ embeds: [embed], components: [ticketRow]});
    },
};