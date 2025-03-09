const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const jsonfile = require('jsonfile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('totalmovies')
        .setDescription('total number of movies in the watchlist!'),
    async execute(interaction) {
        jsonfile.readFile('movies.json', function (err, movieList) {
                    if (err) {
                        console.error(err);
                        return;
                    }      
         interaction.reply(`Current total of movies in the list: ${movieList.length}`);
        });
    },  
};