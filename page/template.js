const head = require('../parts/head.js');
const noscript = require('../parts/noscript.js');
const footer = require('../parts/footer.js');
const screen = require('../parts/screen.js');

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
            ${screen}
            ${script}
            <script src='/js/script_parts.js'></script>
        </body>
    </html>
    `;
}