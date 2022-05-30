ls
cat appmap.yml
npx appmap-agent-js --log-level=info --log-file=log.txt --recorder=process --map-name=lachrist -- node bin/bin.js 8080 db.sqlite3 &
curl -X POST http://localhost:8080/signup/lachrist@appland/1234/laurent
curl http://localhost:8080/signin/lachrist@appland/1234
kill -s SIGINT $!
cat log.txt
cat tmp/appmap/lachrist.appmap.json
