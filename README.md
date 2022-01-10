# appmap-agent-js-demo

This project is a demonstrator for the [JavaScript agent](https://github.com/applandinc/appmap-agent-js) of the [appmap framework](https://appland.com). It is a simplistic node web app which has two endpoints: `/signup/:email/:password/:name` and `/signin/:email/:password`. Nonetheless, this web app uses a representative technology stack:
* [typescript](https://www.typescriptlang.org) (types in JavaScript)
* [express](https://expressjs.com) (http request routing)
* [sqlite3](https://www.google.com/search?client=safari&rls=en&q=sqlite3+npm&ie=UTF-8&oe=UTF-8) (database connection)
* [mocha](https://mochajs.org) (unit tests)

To make this repository ready for appmap, run `node install-appmap.js`. This script performs three tasks:
1. Install the agent as a npm dev dependency.
2. Add a configuration file indicating that the files in `src` should be instrumented.
3. Add some npm scripts:
  * `npm run appmap-test`: Run the mocha unit test suite and write an appmap file for each test case in `tmp/appmap/mocha`.
  * `npm run appmap-start`: Start the web app and write a single appmap file in `tmp/appmap` upon receiving `SIGINT`.
  * `npm run appmap-start-partial`: Start the web app and write appmap files on demand in `tmp/appmap/remote`. Start/stop recording is done via http requests as specified [here](https://appland.com/docs/reference/remote-recording.html).

<p align="center"><img src="/appmap/demo.gif?raw=true"/></p>
