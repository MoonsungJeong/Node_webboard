const time = require("../lib/time");

module.exports = function(data){
    return `
    <section>
        <div class="flex_col h_size_57">
            <form class="padding_3" action="/account/info/info" id="info_form" method="post" onsubmit="return _PRE_CHECK_INFO()">
                <table>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" name="name" value="${data[0].uname}"></td>
                    </tr>
                    <tr>
                        <td>Nick</td>
                        <td><input type="text" name="nickname" value="${data[0].unickname}"></td>
                    </tr>
                    <tr>
                        <td>Birth</td>
                        <td><input type="date" name="birth" value="${time.formatDate_3(data[0].birthdate)}"></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type="text" name="email" value="${data[0].email}"></td>
                    </tr>
                </table>
                <input type="hidden" name="id" value="${data[0].mcode}">
                <button type="submit">change</button>
            </form>
        </div>
    </section>
    `;
}