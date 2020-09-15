const fs = require('fs');
const shell = require('../components/example/iframe-shell.js');

const files = fs
    .readdirSync('./docs/pages/example')
    .filter((f) => f.endsWith('.html'));

files.forEach((file) => {
    const contents = fs.readFileSync(`./docs/pages/example/${file}`, 'utf-8');
    const wrapped = shell(contents);
    fs.writeFileSync(`./docs/pages/example/iframe/${file}`, wrapped, 'utf-8');
});
