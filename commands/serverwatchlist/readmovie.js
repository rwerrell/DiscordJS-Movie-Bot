const { SlashCommandBuilder } = require('discord.js');
const jsonfile = require('jsonfile');
const { Pagination } = require('pagination.djs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('watchlist')
        .setDescription('Lists all the movies in the watchlist!'),
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

            // Check if the movie list is empty
            if (movieList.length === 0) {
                interaction.reply({ content: 'The watchlist is empty.', ephemeral: true });
                return;
            }

            // Create fields for each movie
            const fields = movieList.map(movie => {
                const movieURL = `https://www.google.com/search?q=${movie.Movie.replace(/\s/g, '+')}`;
                return {
                    name: `**${movie.Movie}**`, // Make the movie title bold
                    value: `Added by: ${movie['Added By']}\nDate Added: ${movie['Date Added']}\n[Search](${movieURL})`,
                    inline: false
                };
            });

            // Create a Pagination instance
            const MovieList = new Pagination(interaction)
                .setLimit(8)
                .setTitle('Kitten Cave Movie Watchlist')
                .setColor('#00ff00')
                .setDescription (`Total movies added: ${movieList.length}`)
                .addFields(fields)
                .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL({ extension: 'png' })}` })
                .paginateFields(true);

            // Render the pagination (this sends the paginated embed to the user)
            MovieList.render();
        });
    },
};