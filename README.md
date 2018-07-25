<h2 align="center"><strong>🚀 GraphQL server for <a href="https://djt.wtf/">djt.wtf 👺</a></strong></h2>

## Getting started

```sh
# 1. Clone the server
git clone https://github.com/djt-wtf/graphql-server

# 2. Navigate to the new project
cd graphql-server

# 3. Install dependencies
yarn install

# 4. Create and edit configs
cp .env.example .env
cp database/.env.example database/.env
vim .env
vim database/.env

# 4. Start server (runs on http://localhost:4000) and open GraphQL Playground
yarn dev
```

## Documentation

### Commands

* `yarn start` starts GraphQL server on `http://localhost:4000`
* `yarn dev` starts GraphQL server on `http://localhost:4000` _and_ opens GraphQL Playground
* `yarn playground` opens the GraphQL Playground for the `projects` from [`.graphqlconfig.yml`](./.graphqlconfig.yml)
* `yarn prisma <subcommand>` gives access to local version of Prisma CLI (e.g. `yarn prisma deploy`)

> **Note**: We recommend that you're using `yarn dev` during development as it will give you access to the GraphQL API or your server (defined by the [application schema](./src/schema.graphql)) as well as to the Prisma API directly (defined by the [Prisma database schema](./generated/prisma.graphql)). If you're starting the server with `yarn start`, you'll only be able to access the API of the application schema.


