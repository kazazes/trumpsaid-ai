<h2 align="center"><strong>🚀 Web server powering <a href="https://trumpsaid.wtf/">trumpsaid.wtf</a> 👺</strong></h2>

<h3 align="center">Active construction site. Hardhats on.</h3>

### Requirements

1.  MySQL, Redis, and [Prisma](https://www.prisma.io) servers.
2.  A Google Cloud project with access to the PubSub and Speech APIs.

### Setup

1.  Using `.env.example` as a template, populate environment variables in `.env` and `database/.env`.
2.  Edit `database/prisma.yml` and `.graphqlconfig.yml` to reflect your endpoints, if needed.
3.  `prisma deploy`
4.  `npm install`
5.  `npm run build`
6.  `npm run serve`
