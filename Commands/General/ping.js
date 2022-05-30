const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "Get bot speed",
    timeout: 5000,
    category: "general",
    /**
      * 
      * @param {CommandMenuInteraction} interaction
      */
   async execute(interaction, client, arguments) {
        await interaction.reply(':ping_pong: Pong!')
        const msg = await interaction.fetchReply()
        const embed = new Discord.MessageEmbed()
        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
        .setColor('RANDOM')
        .setTimestamp()
        .setDescription(`**Time:** ${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)} ms\n**API Ping:** ${client.ws.ping} ms`)
        interaction.editReply({ embeds: [embed], content: `<@${interaction.user.id}>` })
    }
}