const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const jsonfile = require('jsonfile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('readmovies')
        .setDescription('Lists all the movies in the watchlist!'),
    async execute(interaction) {
        jsonfile.readFile('movies.json', function (err, movieList) {
            if (err) {
                console.error(err);
                return;
            }

            // Ensure movieList is an array
            if (!Array.isArray(movieList)) {
                console.error('JSON content is not an array');
                return;
            }

            // Create fields for each movie
            const fields = movieList.map(movie => {
                const movieURL = `https://www.google.com/search?q=${movie.Movie.replace(/\s/g, '+')}`;
                return {
                    name: `**${movie.Movie}**`, // Make the movie title bold
                    value: `Added by: ${movie['Added By']}\nDate Added: ${movie['Date Added']}\n[Search](${movieURL})`,
                    inline: true
                };
            });

            var MovieListEmbed = new EmbedBuilder()
                .setColor('DarkGreen')
                .setTitle(`Kitten Cave Movie Watchlist`)
                .addFields(fields)
                .setAuthor({name: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL({extension: 'png'})}`});

            interaction.reply({ embeds: [MovieListEmbed] });
        });
    },  
};