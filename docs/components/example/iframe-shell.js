/* eslint-disable xss/no-mixed-html */

const { viewport, css } = require('./shared.js');
const { version } = require('../../../mapbox-gl-js/package.json');

const { IFRAME_TOKEN } = require('../../constants.json');

function iframeWrapper(html) {
    return `<!DOCTYPE html>
  <html>
  <head>
  <meta charset=utf-8 />
  ${viewport}
  <script src='https://js.sentry-cdn.com/b4e18cb1943f46289f67ca6a771bd341.min.js' crossorigin="anonymous"></script>
  <meta name="robots" content="noindex">
  <script src='https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-instrumentile/v3.0.0/mapbox-gl-instrumentile.js' crossorigin="anonymous"></script>

  <script src='${`https://api.mapbox.com/mapbox-gl-js/v${version}/mapbox-gl.js`}'></script>
  <link href='${`https://api.mapbox.com/mapbox-gl-js/v${version}/mapbox-gl.css`}' rel='stylesheet' />
  <style>
      ${css}
  </style>
  <script>mapboxgl.accessToken = '${IFRAME_TOKEN}'</script>
  </head>
  <body>
  ${html}
  </body>
  <script>
  if (window.map instanceof mapboxgl.Map) {
      var i = new instrumentile(map, {
          token: '${IFRAME_TOKEN}',
          api: 'https://api.tiles.mapbox.com',
          source: 'docs-examples'
      });
  }
  </script>
  </html>`;
}

module.exports = iframeWrapper;
