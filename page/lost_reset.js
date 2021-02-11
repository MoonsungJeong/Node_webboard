module.exports = function(user_id,user_code,key){
    return `
    <main>
        <section>
            <div class=" h_size_65 margin padding_3">
                <div class="space_5 margin_tb padding_3">
                    Hi!~<span class="f_size_a"> ${user_id},</span>
                    Change your password
                    <form action="/account/lost" id="reset_form" method="post" onsubmit="return _PRE_CHECK_RESET()">
                        <br>
                        <table>
                            <tr>
                                <td>Password</td>
                                <td><input type="password" name="password"></td>
                            </tr>
                            <tr>
                                <td>Password-re</td>
                                <td><input type="password" name="password_check"></td>
                            </tr>
                            <input type="hidden" name="key" value="${key}">
                            <input type="hidden" name="code" value="${user_code}">
                        </table>
                        <input class="flex_col" type="submit" value="reset">
                    </form>
                </div>
            </div>
        </section>
    </main>
    `;
}