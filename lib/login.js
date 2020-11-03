const head = require('../parts/head.js');
const header = require('../parts/header.js');
const noscript = require('../parts/noscript.js');
const footer = require('../parts/footer.js');

module.exports = function(){
    return `
    <!DOCTYPE html>
    <html lang="en">
        ${head}
        <body>
            ${noscript}
            ${header}
            <main>
                <section>
                    <div class="flex_col h_size_80">
                        <form class="space_5 margin_top_5 padding_3" action="/login" method="post">
                            <table>
                                <tr>
                                    <td>ID</td>
                                    <td><input type="text" name="id"></td>
                                </tr>
                                <tr>
                                    <td>PW</td>
                                    <td><input type="password" name="password"></td>
                                </tr>
                            </table>
                            <input type="submit" value="log-in">
                            <div>
                                <a href="/sign-up">sign-up</a>&nbsp|&nbsp
                                <a href="/id-pw">lost ID/PW</a>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
            ${footer}
        </body>
    </html>
    `;
}
