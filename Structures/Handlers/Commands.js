const {glob} = require('glob')
const { promisify } = require('util')
const globPromise = promisify(glob)

module.exports = async (client) => {
     const CommandFiles = await globPromise(`${process.cwd()}/Commands/*/*.js`);

     commandsArry= [];

     CommandFiles.map(async (commandFile)=>{
          const command = await require(commandFile)

          if(!command.name) return;
          if(command.Perms) command.defaultPermission = false

          const C = commandFile.split('/');
          console.log(`✅ Loaded ` + command.name.toUpperCase() + ` From ${C[C.length - 2]}`);

          await client.commands.set(command.name, command)
          commandsArry.push(command);
     });

     client.on("ready", async() =>{
          const mainGuild = await client.guilds.cache.get("956777522471796736");

               mainGuild.commands.set(commandsArry);

     })
}