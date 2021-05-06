const head = require('../parts/head.js');
const noscript = require('../parts/noscript.js');
const footer = require('../parts/footer.js');

module.exports = function(header,main,screen,script){
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
            <script src='/js/script_init.js'></script>
            <script src='/js/script_parts.js'></script>
            <script src='/js/script_search.js'></script>
            ${script}
        </body>
    </html>
    `;
}