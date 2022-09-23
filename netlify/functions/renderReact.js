const React = require('react');
const reactDomServer = require('react-dom/server');
const reactRouter = require('react-router');
const secrets = require('../../src/components/secrets.jsx');


module.exports = function(app) {
  app.get('*', (req, res) => {
    match({ routes: secrets, location: req.url }, (err, redirect, props) => {
        const appHtml = reactDomServer.renderToString(React.createElement(secrets, props))
        res.send(renderPage(appHtml))
    })
  })
};