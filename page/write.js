const ad_1 = require('../parts/ad_1.js');
                    
module.exports = function(authStatusWrite='<div>Author<input type="text" name="author"></div><div>PW &nbsp;<input type="password" name="password"></div>'){
    return `
    <main>
        ${ad_1}
        <section>
            <form class="center" action="/board/new" id="write_form" method="post" onsubmit="return _PRE_CHECK_WRITE()">
                <div>
                    ${authStatusWrite}
                    <div>Title &nbsp;<input type="text" name="title"></div>
                    <div>Category<select name="board"><option value="1">Free</option><option value="2">Info</option></select></div>
                </div>
                <p>Content</p>
                <textarea class="size_90 h_size_50" name="content"></textarea>
                <br>
                <button type="submit">write</button>
                <button onclick="">cancel</button>
            </form>
        </section>
        ${ad_1}
    </main>
    `;
}