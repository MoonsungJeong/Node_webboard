const codec = require("../lib/codec.js");
module.exports = function(data){
    return `
    <section>
        <div class="flex_col h_size_57">
            <form class="padding_3" action="/account/info/pw" id="pw_form" method="post" onsubmit="return _PRE_CHECK_PW()">
                <table>
                    <tr>
                        <td>PW</td>
                        <td><input type="password" name="pw"></td>
                    </tr>
                    <tr>
                        <td>New PW</td>
                        <td><input type="password" name="new_pw"><span><span></td>
                    </tr>
                    <tr>
                        <td>New PW-Re</td>
                        <td><input type="password" name="new_pw_re"></td>
                    </tr>
                </table>
                <input type="hidden" name="id" value="${codec.code_num(data)}">
                <button type="submit">change</button>
            </form>
        </div>
    </section>
    `;
}