# Description

It's a simple api of a **TODO APP** to use any frontend (Web, Mobile, Desktop, ...).

# Tecnologies

It's implemented in NodeJS with Typescript, but it could be whatever technology is used.

# Instalation

```bash
  # PNPM
  $ pnpm install 
  # NPM
  $ npm install 
  # YARN
  $ yarn
```

# Paths

| Route      | Method | Description        |
| :--------- | :----: | ------------------ |
| /todos     |  GET   | Receive All Todos  |
| /todos     |  POST  | Create a new todo  |
| /todos/:id |  GET   | Receive todo by id |
| /todos/:id | DELETE | Delete todo by id  |
| /todos/:id |  PUT   | Update todo by id  |

# Running App

```bash
  # PNPM
  $ pnpm start 
  # NPM
  $ npm run start
  # YARN
  $ yarn start
```

# Atention

If you is using **`pnpm`** and to use (pre/pos)Script run that: ``pnpm config set enable-pre-post-scripts true``

[Issue](https://github.com/pnpm/pnpm/issues/2891)

[Documentation about it](https://pnpm.io/pt/cli/run#differences-with-npm-run)
