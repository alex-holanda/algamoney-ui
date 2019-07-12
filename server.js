const path = require('path');
const express = require('express');
const appName = 'algamoney-ui';
const app = express();

app.use(express.static(`${__dirname}/dist/${appName}`));

app.get('/*', function(req, res) {
  res.sendFile(path.join(`${__dirname}/dist/${appName}/index.html`));
});

app.listen(process.env.PORT || 4200);
