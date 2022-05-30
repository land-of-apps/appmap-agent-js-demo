npx appmap-agent-js --recorder=remote -- node bin/bin.js 8080 db.sqlite3
curl -X POST http://localhost:8080/signup/lachrist@appland/1234/laurent
curl http://localhost:8080/signin/lachrist@appland/1234