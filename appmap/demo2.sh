npm install && npm run build
node appmap/install.js
npm run appmap-start-partial
curl -X POST http://localhost:8080/signup/lachrist@vub.ac.be/1234/laurent
curl http://localhost:8080/signin/lachrist@vub.ac.be/1234