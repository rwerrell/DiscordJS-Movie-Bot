
# DiscordJS-Movie-Bot

A Simple discord bot that allows users to add and edit an existing movie list on a server basis.

- Designed for a small server in mind so all data is stored in a file within this repository.

- No database involved.

## Setup
1. Create a config.json file in the root directory of the project.

    1.1 Add your bot token to the config.json file.

    1.2 Add your server id to the config.json file.

    1.3 Add your client id to the config.json file.

2. Create a movies.json file in the root directory of the project.

3. Add the bot to your server.

4. Run the bot using the command `node index.js` in the root directory of the project.

## Framework

- [Discord.js ](https://discord.js.org/)

- [pagination.djs](https://pagination-djs.js.org/)

## Todo

- [x] Add a command to delete a movie from the watchlist.#
- [x] Add a command to add a movie to the watchlist.
- [x] Add a command to list all the movies in the watchlist.
- [x] Add a command to select a random movie from the watchlist.
- [ ] Add a command to edit a movie in the watchlist.
- [ ] Add a command to mark a movie as seen.
- [ ] Add a ranking system for seen movies.
- [ ] Add a command to see the ranking of seen movies.
- [ ] Add a voting system for picking a movie to watch next.
