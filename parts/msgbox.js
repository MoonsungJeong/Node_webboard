module.exports = msgbox =`
<div id="msg_box" class="space_6 size_5 msg_box">
    <div class="flex_between line-bottom">
        <h2>Message</h2>
        <span><button id="msg_x_btn">x</button></span>
    </div>
    <div>
        <form id="msg_content" class="flex_col">
            ID
            <input class="size_90" type="text" name="id">
            <textarea class="h_size_10 size_90" name="content"></textarea>
            <input type="hidden" name="hidden_id" value="">
            <input id="msg_sent_btn" type="button" value="send">
        </form>
    </div>
</div>
`
