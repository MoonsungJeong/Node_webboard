module.exports = function(data){
    return `
    <section>
        <div class="flex_col h_size_57">
            <form class=" padding_3" action="" id="" method="post" onsubmit="">
                <table>
                    <tr>
                        <td>Name</td>
                        <td><input type="text" name="name"></td>
                    </tr>
                    <tr>
                        <td>Nick</td>
                        <td><input type="text" name="nickname"><span><span></td>
                    </tr>
                    <tr>
                        <td>Birth</td>
                        <td><input type="date" name="birth"></td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td><input type="text" name="email"></td>
                    </tr>
                </table>
                <button type="submit">change</button>
            </form>
        </div>
    </section>
    `;
}