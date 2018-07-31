<h2 align="center"><strong>🚀 Web server powering <a href="https://djt.wtf/">trumpsaid.wtf</a> 👺</strong></h2>

## Getting started

```sh
# 1. Clone the server
git clone https://github.com/trumpsaid-wtf/web-app.git djt-wtf

# 2. Navigate to the new project
cd djt-wtf

# 3. Install dependencies
npm install

# 4. Create and edit configs
cp .env.example .env
cp database/.env.example database/.env
vim .env
vim database/.env

# 4. Deploy prisma cluster
prisma deploy

# 5. Run server
npm run debug
```
