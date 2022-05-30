ls
cat appmap.yml
npx appmap-agent-js --recorder=mocha -- npx mocha -r ts-node/register 'test/*.ts'
ls tmp/appmap/mocha
cat tmp/appmap/mocha/GET-signin.appmap.json
