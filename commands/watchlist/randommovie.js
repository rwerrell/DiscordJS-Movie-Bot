const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const jsonfile = require('jsonfile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('randommovieselect')
        .setDescription('Selects a random movie from the watchlist!'),
    async execute(interaction) {
        jsonfile.readFile('movies.json', function (err, movieList) {
            if (err) {
                console.error(err);
                interaction.reply({ content: 'An error occurred while reading the watchlist.', ephemeral: true });
                return;
            }

            // Ensure movieList is an array
            if (!Array.isArray(movieList)) {
                console.error('JSON content is not an array');
                interaction.reply({ content: 'The watchlist is not in the correct format.', ephemeral: true });
                return;
            }

            // Check if the movie list is empty
            if (movieList.length === 0) {
                interaction.reply({ content: 'The watchlist is empty.', ephemeral: true });
                return;
            }

            // Select a random movie
            const randomIndex = Math.floor(Math.random() * movieList.length);
            const randomMovie = movieList[randomIndex];

            // Create an embed for the random movie
            const movieURL = `https://www.google.com/search?q=${randomMovie.Movie.replace(/\s/g, '+')}`;
            const MovieEmbed = new EmbedBuilder()
                .setColor('DarkGreen')
                .setTitle(`${randomMovie.Movie}`)
                .setDescription(`Added by: ${randomMovie['Added By']}\nDate Added: ${randomMovie['Date Added']}`)
                .setURL(movieURL)
                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL({ extension: 'png' })}` });

            // Send the random movie as a reply
            interaction.reply({ embeds: [MovieEmbed] });
        });
    },
};