const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
     name: "interactionCreate",

     /**
      * @param {CommandInteraction} interaction
      * @param {Client} client
      */
     async execute(interaction, client) {
          if(interaction.isCommand() || interaction.isContextMenu()) {
               const command = client.commands.get(interaction.commandName);
               if(!command) return interaction.reply({embeds: [
                  new MessageEmbed()
                  .setColor("RED")
                  .setDescription("⛔ An error occured while running this specific command :C")
               ]}) && client.commands.delete(interaction.commandName);

               const arguments = [];

               for(let option of interaction.options.data){
                    if(option.type === 'SUB_COMMAND'){
                         option.options?.forEach((x) =>{
                              if (x.value) arguments.push(option.value);
                         });
                    } else if (option.value) arguments.push(option.value);
          };
          if (command.permission && !interaction.member.permissions.has(command.permission)) {
               return interaction.reply({ content: `You do not have the required permission for this command: \`${interaction.commandName}\`.`, ephemeral: true })
           }
               command.execute(interaction, client, arguments);
          }
          
     }
}