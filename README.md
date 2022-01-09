# appmap-agent-js-demo

This project is a demonstrator for the [JavaScript agent](https://github.com/applandinc/appmap-agent-js) for the [appmap framework](https://appland.com). It is simplistic a node web app which has two endpoints: `/signup/:email/:password/:name` and `/signin/:email/:password`. Nonetheless this web app use a representative technology stack:
* [typescript](https://www.typescriptlang.org)
* [express](https://expressjs.com) for http request routing
* [sqlite3](https://www.google.com/search?client=safari&rls=en&q=sqlite3+npm&ie=UTF-8&oe=UTF-8) for database access
* [mocha](https://mochajs.org) for unit tests

Diff compared to an appmap-unrelated repository:

|                                           | Installation (Terminal)                           | Installation (VSCode) |
|-------------------------------------------|---------------------------------------------------|-----------------------|
| `@appland/appmap-agent-js` npm dependency | `npm install --save-dev @appland/appmap-agent-js` | available             |
| `appmap.yml` configuration file           | `npx appmap-agent-js setup`                       | available             |
| npm scripts                               | not available                                     | not available         |

The agent is setup to perform the following commands:
* `npm run appmap-mocha`: Run the mocha unit test and write an appmap file for each test case in `tmp/appmap/mocha`.
* `npm run appmap-start`: Start the web app and write a single appmap file in `tmp/appmap` upon receiving `SIGINT`.
* `npm run appmap-start-remote`: Start the web app and write appmap files on demand in `tmp/appmap/remote`. Start/stop recording is done via HTTP requests as specified [here](https://appland.com/docs/reference/remote-recording.html).
