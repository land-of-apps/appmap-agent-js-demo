npm install --silent --save-dev @appland/appmap-agent-js
# vim appmap.yml
# log: error
# packages:
#   glob: src/*
echo 'log: error\npackages:\n  glob: src/*' > appmap.yml

npx appmap-agent-js --recorder process -- node bin/bin.js 8080 db.sqlite3
vim tmp/appmap/anonymous.appmap.json

npx appmap-agent-js --recorder mocha -- npx mocha -r ts-node/register 'test/*.ts'
ls tmp/appmap/mocha
