const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const jsonfile = require('jsonfile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('myrandommovie')
        .setDescription('Selects a random movie from your watchlist!'),
    async execute(interaction) {
        jsonfile.readFile('watchlist.json', function (err, movieList) {
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

            const userMovies = movieList.filter(movie => movie['Added By'] === interaction.user.username);

            if (userMovies.length === 0) {
                interaction.reply({ content: 'You have not added any movies to the watchlist.', ephemeral: true });
                return;
            }

            // Select a random movie
            const randomIndex = Math.floor(Math.random() * userMovies.length);
            const randomMovie = userMovies[randomIndex];

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