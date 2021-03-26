# Buildhouse Bookmark Manager (server)

The GraphQL server for Buildhouse Bookmark Manager.
More information about Buildhouse Bookmark Manager can be found in the [Gabbersaurus/buildhouse-bookmarkmanager-client](https://github.com/Gabbersaurus/buildhouse-bookmarkmanager-client) repository

## Installation and running

-   Run `yarn install` to install packages
-   Copy `.env.example` to `.env`
    -   Enter the port that the server should run on in the `PORT` value.
    -   Enter the secret key for the authentication token on in the `SECRET` value. It can be generated with `yarn cli generate-secret`.
    -   Enter the authentication expire time in the `AUTHEXPIRE` value. The time entered is in seconds.
    -   Enter the favicon expire time in the `FAVICONEXPIRE` value. The time entered is in seconds.
-   Run `yarn migration:run` to create the database tables.
-   Create a user by running `yarn cli create-user {username} {password}.
    -   A user can be removed by running `yarn cli delete-user {username}`
-   Start the server by running `yarn start`. The server can now be used in the client.
