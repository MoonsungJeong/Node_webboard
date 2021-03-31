module.exports = function(data){
    return `
    <section>
        <div class="flex_col h_size_57">
            <form class=" padding_3" action="" id="" method="post" onsubmit="//return _PRE_CHECK_SIGNUP();">
                <table>
                    <tr>
                        <td>PW</td>
                        <td><input type="password" name="pw"></td>
                    </tr>
                    <tr>
                        <td>New PW</td>
                        <td><input type="password" name="new-pw"><span><span></td>
                    </tr>
                    <tr>
                        <td>New PW-Re</td>
                        <td><input type="password" name="new-pw-re"></td>
                    </tr>
                </table>
                <button type="submit">change</button>
            </form>
        </div>
    </section>
    `;
}