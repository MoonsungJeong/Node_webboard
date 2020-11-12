const head = require('../parts/head.js');
const noscript = require('../parts/noscript.js');
const footer = require('../parts/footer.js');

module.exports = function(header,main,script){
    return `
    <!DOCTYPE html>
    <html lang="en">
        ${head}
        <body>
            ${noscript}
            ${header}
            ${main}
            ${footer}
            ${script}
        </body>
    </html>
    `;
}