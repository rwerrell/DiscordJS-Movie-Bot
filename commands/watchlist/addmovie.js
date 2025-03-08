const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addmovie')
        .setDescription('Adds a movie to the watchlist!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The movie you wanted to add.')
                .setRequired(true)
                .setMaxLength(32)
                .setMinLength(1)),  
    async execute(interaction) {
        var movie = interaction.options.getString('input');
        var movieURL = movie.replace(/\s/g, '+');
        var MovieEmbed = new EmbedBuilder()
            .setColor('DarkGreen')
            .setTitle(`${movie}`)
            .setDescription(`Movie above added to the watchlist`)
            .setURL(`https://www.google.com/search?q=${movieURL}`)
            .setAuthor({name: `${interaction.user.username}`, iconURL: `${interaction.user.avatarURL({extension: 'png'})}`});

        var data = {
            "Movie" : `${movie}`,
            "Added By" : `${interaction.user.username}`,
            "Date Added" : `${interaction.createdAt.toLocaleString()}`
        };

        fs.readFile('movies.json', 'utf8', (err, jsonString) => {
            let movies;
            if (err && err.code === 'ENOENT') {
                // File does not exist, create a new array
                movies = [];
            } else if (err) {
                console.error(err);
                interaction.reply({ content: 'An error occurred while reading the watchlist.', ephemeral: true });
                return;
            } else {
                try {
                    // Parse the existing file content
                    movies = JSON.parse(jsonString);
                    if (!Array.isArray(movies)) {
                        console.warn('JSON content is not an array, initializing as an empty array');
                        movies = [];
                    }
                } catch (parseErr) {
                    console.error('Error parsing JSON:', parseErr);
                    interaction.reply({ content: 'An error occurred while parsing the watchlist.', ephemeral: true });
                    return;
                }
            }

            // Check if the movie already exists in the list
            if (movies.some(m => m.Movie.toLowerCase() === movie.toLowerCase())) {
                interaction.reply({ content: `The movie "${movie}" is already in the watchlist.`, ephemeral: true });
                return;
            }

            // Add the new movie to the array
            movies.push(data);

            // Write the updated array back to the file
            fs.writeFile('movies.json', JSON.stringify(movies, null, 2), (err) => {
                if (err) {
                    console.error(err);
                    interaction.reply({ content: 'An error occurred while updating the watchlist.', ephemeral: true });
                    return;
                }

                // Send a confirmation message
                interaction.reply({ embeds: [MovieEmbed] });
            });
        });
    },
};