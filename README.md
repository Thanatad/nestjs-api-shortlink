## Description

A ShortLink application
* TypeORM
* pNPM

## Installation

```bash
$ cp .env.example .env.development ; cp .env.example .env.production
$ pnpm install
```
## Migration

```bash
$ pnpm run migration:generate
$ pnpm run migration:run
```
## Running the app

```bash
# development
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
## Access the app
```bash
# api uri
//localhost:<port>/api/~
