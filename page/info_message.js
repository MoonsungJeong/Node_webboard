module.exports = function(data){
    return `
    <section>
        <div class="board">
            <h2>
                <span class="font_gray">7 message (1/1 page)</span>
            </h2>
        </div>
        <div class="flex_col h_size_57">
            <form class="size_90" action="">
                <table class="center size_100">
                    <thead>
                        <tr class="line space_7">
                            <td class="padding_side">ⓥ</td>
                            <td>Sender</td>
                            <td>Content</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody class="f_size_b">
                        <tr class="line-bottom">
                            <td class="padding_side"><input type="checkbox"></td>
                            <td class="font_gray">ID</td>
                            <td>Content</td>
                            <td class="font_gray">2021.01.01</td>
                        </tr>
                        <tr class="line-bottom">
                            <td class="padding_side"><input type="checkbox"></td>
                            <td class="font_gray">ID</td>
                            <td>Content</td>
                            <td class="font_gray">2021.01.01</td>
                        </tr>
                        <tr class="line-bottom">
                            <td class="padding_side"><input type="checkbox"></td>
                            <td class="font_gray">ID</td>
                            <td>Content</td>
                            <td class="font_gray">2021.01.01</td>
                        </tr>
                        <tr class="line-bottom">
                            <td class="padding_side"><input type="checkbox"></td>
                            <td class="font_gray">ID</td>
                            <td>Content</td>
                            <td class="font_gray">2021.01.01</td>
                        </tr>
                        <tr class="line-bottom">
                            <td class="padding_side"><input type="checkbox"></td>
                            <td class="font_gray">ID</td>
                            <td>Content</td>
                            <td class="font_gray">2021.01.01</td>
                        </tr>
                        <tr class="line-bottom">
                            <td class="padding_side"><input type="checkbox"></td>
                            <td class="font_gray">ID</td>
                            <td>Content</td>
                            <td class="font_gray">2021.01.01</td>
                        </tr>
                        <tr class="line-bottom">
                            <td class="padding_side"><input type="checkbox"></td>
                            <td class="font_gray">ID</td>
                            <td>Content</td>
                            <td class="font_gray">2021.01.01</td>
                        </tr>
                    </tbody>
                </table>
                <div class="center">
                    <a class="font_gray"><i class="fas fa-angle-double-left"></i></a> 
                    <a class="font_gray"><i class="fas fa-angle-left"></i></a>
                    <a>1</a>
                    <a class="font_gray"><i class="fas fa-angle-right"></i></a>
                    <a class="font_gray"><i class="fas fa-angle-double-right"></i></a>
                </div>
                <button type="submit">Delete</button>
                <button>Message</button>
            </form>
        </div>
    </section>
    `;
}