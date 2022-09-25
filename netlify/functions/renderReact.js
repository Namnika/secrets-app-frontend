const React = require('react');
const reactDomServer = require('react-dom/server');
const reactRouter = require('react-router');
const secrets = require('../../src/components/secrets');


module.exports = function(app) {
  app.get('*', async (req, res) => {
    const scripts = ['vendor.js', 'index.js'];
    const app = <App />;
    const secrets = <Secrets children={appMarkup} scripts={scripts} />

    const appMarkup = ReactDOMServer.renderToString(app);
    const html = ReactDOMServer.renderToStaticMarkup(secrets);
    res.send(html);
  });
};
