# VitShelf2

![Express](https://img.shields.io/badge/Express-000000.svg?style=flat-square&logo=Express&logoColor=white)  ![JSON](https://img.shields.io/badge/JSON-000000.svg?style=flat-square&logo=JSON&logoColor=white)  ![npm](https://img.shields.io/badge/npm-CB3837.svg?style=flat-square&logo=npm&logoColor=white)  ![MobX](https://img.shields.io/badge/MobX-FF9955.svg?style=flat-square&logo=MobX&logoColor=white)  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat-square&logo=JavaScript&logoColor=black)  ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat-square&logo=Nodemon&logoColor=white)  ![React](https://img.shields.io/badge/React-61DAFB.svg?style=flat-square&logo=React&logoColor=black)  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat-square&logo=TypeScript&logoColor=white)  ![Axios](https://img.shields.io/badge/Axios-5A29E4.svg?style=flat-square&logo=Axios&logoColor=white)  ![CSS](https://img.shields.io/badge/CSS-663399.svg?style=flat-square&logo=CSS&logoColor=white)

## Overview

Bookshelf 2 is a full-stack personal library application rebuilt as a TypeScript monorepo. A Next.js client with MobX state management sits alongside an Express.js API server, both sharing a SQLite database with WAL-mode for concurrent access.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

---

## Features

|      | Component         | Details                                                                                                                                                                                                                                                          |
| :--- | :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️  | **Architecture**  | <ul><li>Full-stack **client/server** monorepo split</li><li>**Client:** Next.js (React) SPA with TypeScript</li><li>**Server:** Express.js REST API with TypeScript</li><li>SQLite database via `better-sqlite3` with WAL mode (`bookshelf.db-wal`, `bookshelf.db-shm`)</li><li>State management via **MobX** + `mobx-react-lite`</li></ul> |
| 🔩 | **Code Quality**  | <ul><li>TypeScript enforced on both client and server (`tsconfig.json`)</li><li>Strict type definitions via `@types/node`, `@types/react`, `@types/react-dom`</li><li>`.tsx` / `.ts` source files throughout</li><li>Consistent `package.json` config per workspace</li></ul> |
| 📄 | **Documentation** | <ul><li>No dedicated docs directory detected</li><li>`LICENSE` file present</li><li>`site.webmanifest` documents PWA metadata</li><li>Inline code comments assumed via TypeScript self-documenting types</li></ul> |
| 🔌 | **Integrations**  | <ul><li>**`axios`** — HTTP client for client→server API calls</li><li>**`next-intl`** — i18n/localization support in Next.js</li><li>**`cors`** — Cross-origin resource sharing on Express server</li><li>**`nodemon`** — Live-reload during server development</li><li>PWA-ready via `site.webmanifest`</li></ul> |
| 🧩 | **Modularity**    | <ul><li>Clear **client/server** separation with independent `package.json` files</li><li>MobX stores enable isolated, reactive state modules</li><li>Express routes likely split by resource (books, users, auth)</li><li>Next.js file-based routing for page modularity</li></ul> |

---

## Project Structure

```
└── bookshelf2/
    ├── client
    │   ├── .next
    │   ├── app
    │   ├── features
    │   ├── middleware.ts
    │   ├── next-env.d.ts
    │   ├── next.config.ts
    ├── LICENSE
    ├── README.md
    └── server
        ├── db
        ├── index.js
        ├── middleware
        ├── package-lock.json
        ├── package.json
        └── routes
```

---

## Getting Started

### Prerequisites

- Python 3.10+ / Node.js 18+ *(depending on the stack above)*

### Installation

```sh
git clone https://github.com/IlluzyonistCode/VitShelf2
cd VitShelf2
npm install
```

### Usage

```sh
npm run dev
```

---

## Contributing

- [Report Issues](https://github.com/IlluzyonistCode/VitShelf2/issues)
- [Submit Pull Requests](https://github.com/IlluzyonistCode/VitShelf2/pulls)
- [Discussions](https://github.com/IlluzyonistCode/VitShelf2/discussions)

---

## License

Distributed under the [AGPL-3.0](LICENSE) license.
