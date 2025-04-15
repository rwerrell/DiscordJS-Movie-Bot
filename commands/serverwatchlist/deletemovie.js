const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const jsonfile = require('jsonfile');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletemovie')
        .setDescription('Deletes a movie from the watchlist!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The movie you want to delete.')
                .setRequired(true)
                .setMaxLength(32)
                .setAutocomplete(true)
                .setMinLength(1)),
                
    async execute(interaction) {
        const movieToDelete = interaction.options.getString('input');

        jsonfile.readFile('watchlist.json', function (err, movieList) {
            if (err) {
                console.error(err);
                return;
            }

            // Ensure movieList is an array
            if (!Array.isArray(movieList)) {
                console.error('JSON content is not an array');
                return;
            }

            // Filter out the movie to delete
            const updatedMovieList = movieList.filter(movie => movie.Movie.toLowerCase() !== movieToDelete.toLowerCase());

            if (updatedMovieList.length === movieList.length) {
                // Movie not found
                interaction.reply({ content: `Movie "${movieToDelete}" not found in the watchlist.`, ephemeral: true });
                    return;
                return;
            }

            // Write the updated array back to the file
            jsonfile.writeFile('watchlist.json', updatedMovieList, { spaces: 2 }, function (err) {
                if (err) {
                    console.error(err);
                    return;
                }

                // Send a confirmation message
                const MovieEmbed = new EmbedBuilder()
                    .setColor('DarkRed')
                    .setTitle(`${movieToDelete}`)
                    .setDescription(`Movie above has been deleted from the watchlist`)
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL({ extension: 'png' })}` });

                interaction.reply({ embeds: [MovieEmbed] });
            });
        });
    },
};