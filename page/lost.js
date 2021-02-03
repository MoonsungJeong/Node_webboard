module.exports = function(){
    return `
    <main>
        <section>
            <div class="flex_col">
                <form class="space_5 margin_tb_3 padding_3" action="/account/lost/id" id="lost_form_id" method="post" onsubmit="return _PRE_CHECK_LOST_ID()">
                    Find your ID
                    <table>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" name="name"></td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="text" name="email"></td>
                        </tr>
                    </table>
                    <input type="submit" value="find-id">
                </form>
            </div>
        </section>
        <section>
            <div class="flex_col">
                <form class="space_5 margin_tb_3 padding_3" action="/account/lost/pw" id="lost_form_pw" method="post" onsubmit="return _PRE_CHECK_LOST_PW()">
                    Find your Password
                    <table>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" name="name"></td>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td><input type="text" name="id"></td>
                        </tr>
                    </table>
                    <input type="submit" value="find-pw">
                </form>
            </div>
        </section>
    </main>
    `;
}