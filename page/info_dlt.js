const codec = require("../lib/codec.js");
module.exports = function(data){
    return `
    <section>
        <div class="flex_col h_size_57">
            <form class=" padding_3" action="/account/info/dlt" id="dlt_form" method="post" onsubmit="return _PRE_CHECK_DLT();">
                <table>
                    <tr>
                        <td>PW</td>
                        <td><input type="password" name="pw"></td>
                    </tr>
                    <tr>
                        <td>PW-Re</td>
                        <td><input type="password" name="pw_re"></td>
                    </tr>
                </table>
                <input type="hidden" name="id" value="${codec.code_num(data)}">
                <button type="submit">delete</button>
            </form>
        </div>
    </section>
    `;
}