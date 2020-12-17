const ad_1 = require('../parts/ad_1.js');

module.exports = function(code, title, content, category){
    return `
    <main>
        ${ad_1}
        <section>
            <form class="center" action="/board/review/${code}" id="update_form" method="get" onsubmit="return _PRE_CHECK_UPDATE()" onload="test()">
                <div>
                    <div>Update!!!!</div>
                    <div><input type="hidden" name="code" value="${code}"></div>
                    <div><input type="hidden" name="author" value="NULL"></div>
                    <div><input type="hidden" name="password" value="NULL"></div>
                    <div>Title &nbsp;<input type="text" name="title" value="${title}"></div>
                    <div>Category<select name="board" value="${category}"><option value="1">Free</option><option value="2">Info</option></select></div>
                </div>
                <p>Content</p>
                <textarea class="size_90 h_size_50" name="content">${content}</textarea>
                <br>
                <button type="submit">write</button>
                <button onclick="return _UPDATE_CANCEL_CHECK()">cancel</button>
            </form>
        </section>
        ${ad_1}
    </main>
    `;
}