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
                        <form class="space_5 margin_top_5 padding_3" action="/sign-up" method="post">
                            <table>
                                <tr>
                                    <td>ID</td>
                                    <td><input type="text" name="id"></td>
                                </tr>
                                <tr>
                                    <td>PW</td>
                                    <td><input type="password" name="password"></td>
                                </tr>
                                <tr>
                                    <td>PW-re</td>
                                    <td><input type="password" name="password_check"></td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td><input type="text" name="name"></td>
                                </tr>
                                <tr>
                                    <td>Birth</td>
                                    <td><input type="date" name="birth"></td>
                                </tr>
                                <tr>
                                    <td>Nick</td>
                                    <td><input type="text" name="nickname"></td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td><input type="text" name="email"></td>
                                </tr>
                            </table>
                            <input type="submit" value="sign-up">
                        </form>
                    </div>
                </section>
            </main>
        ${footer}
        </body>
    </html>
    `;
}
