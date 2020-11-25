module.exports = function(){
    return `
    <main>
        <section>
            <div class="flex_col h_size_80">
                <form class="space_5 margin_top_5 padding_3" action="/account/login" id="login_form" method="post" onsubmit="return _PRE_CHECK_LOGIN()">
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
                    <button type="submit">log-in</button>
                    <div>
                        <a href="/account/sign-up">sign-up</a>&nbsp|&nbsp
                        <a href="/account/id-pw">lost ID/PW</a>
                    </div>
                </form>
            </div>
        </section>
    </main>
    `;
}