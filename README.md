# live-data-server

Restful CRUD API development server for frontend projects to demo.

Similar to [json-server](https://github.com/typicode/json-server) but backed by sqlite3.

[![npm Package Version](https://img.shields.io/npm/v/live-data-server)](https://www.npmjs.com/package/live-data-server)

## Features

- No need to install (npx executable)
- RESTful API
- Persisted by sqlite3
- CRUD table objects
- CRUD key-value pairs
- File Upload
- Search by any field
- Search with range / logics (TODO)

## Usage

```bash
npx live-data-server [port]
```

The port number can be set with `PORT` environment variable as well, otherwise it will use any available port.

Usage Example:

```bash
> npx live-data-server 8600
listening on http://localhost:8600
listening on http://127.0.0.1:8600 (lo)
listening on http://192.168.80.105:8600 (wlp3s0)
```

## APIs

### Files API

| Method | Path   | Field |
| ------ | ------ | ----- |
| POST   | /files | file  |

### Collection API

| Method | Path                   | Description        |
| ------ | ---------------------- | ------------------ |
| GET    | /collection/:table     | get all / search\* |
| GET    | /collection/:table/:id | get by id          |
| POST   | /collection/:table     | create             |
| PATCH  | /collection/:table/:id | update by id       |
| DELETE | /collection/:table/:id | delete by id       |

Supported Search Example:

```
GET /collection/user?role=admin&status=active
```

To-be Supported Search Example:

```
GET /collection/house?rent=below(5000)&area=at_least(200)
GET /collection/product?price=between(10,20)
GET /collection/user?role=not(admin)
GET /collection/user?role=any(shop,client)
```

### Dictionary (key-value) API

| Method | Path        | Description    |
| ------ | ----------- | -------------- |
| POST   | /dict/:name | init by name   |
| GET    | /dict/:name | get by name    |
| PATCH  | /dict/:name | update by name |
| DELETE | /dict/:name | delete by name |

## Todo

- support realtime update notices
- support pub/sub channel

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
