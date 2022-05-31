ls
cat appmap.yml
npx appmap-agent-js --recorder=remote --track-port=3000 -- node bin/bin.js 8080 db.sqlite3 &
curl -X POST http://localhost:3000/_appmap/record
curl -X POST http://localhost:8080/signup/lachrist@appland/1234/laurent
curl -X GET http://localhost:8080/signin/lachrist@appland/1234
curl -X DELETE http://localhost:3000/_appmap/record
kill -s SIGINT $!