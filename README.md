## Introduction

Hi there, hope you'll enjoy this task :)

This repo contains code for a simple React app. It's basically a database of characters of very popular tv series (you will see which series after you start the app, we don't want to spoil the fun). It uses [Apollo Client](https://www.apollographql.com/docs/react/) to communicate with the open [graphQL](https://graphql.org/) API (you can find the link to the API docs in Docs section of the app). It also uses TypeScript but feel free to use plain JS if you feel more comfortable with it.

## Task

On the main page you can see a list of characters. The list loads the first 20 records from the database. The API provides pagination.

As you're task you'll be adding two simple functionalities:

1. **Infinite scroll for the characters list.** When the user scrolls down the list and reaches the end of the first 20 records we should load another 20 records from the API and add them to the current results. When user scrolls down again we add another 20 and so on.
2. **Add possibility to search by name.** Above current list you should add input and search button. When user provides a name and clicks button it should call the API to filter the results based on provided name. If the list is bigger then 20 records user should still have possibility to load more records based on solution from first point.

You should implement proper error handling. User should receive information if there were some issues with API.

Feel free to add any packages/libraries you may deem necessary or useful (within reason).

## Useful Scripts

### `yarn install`

Installs all dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\



## Good luck!
