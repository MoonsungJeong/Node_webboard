module.exports = function(){
    return `
    <main>
        <section>
            <div class="flex_col h_size_80">
                <form class="space_5 margin_top_5 padding_3" action="/account/sign-up" id="sign_form" method="post" onsubmit="return _PRE_CHECK_SIGNUP();">
                    <table>
                        <tr>
                            <td>ID</td>
                            <td><input type="text" name="id"><span><span></td>
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
                            <td><input type="text" name="nickname"><span><span></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="text" name="email"></td>
                        </tr>
                    </table>
                    <button type="submit">sign-up</button>
                </form>
            </div>
        </section>
    </main>
    `;
}