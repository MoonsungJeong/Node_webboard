var socket = io();
var form = document.getElementById('chat_form');
var input_id = document.getElementById('chat_id');
var input_msg = document.getElementById('chat_message');
var board = document.getElementById('chat_board');
window.onload = function(){
    if(input_id.value){socket.emit('enter',input_id.value);}
};
form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input_id.value && input_msg.value) {
    socket.emit('message', JSON.stringify({'id':`${input_id.value}`,'msg':`${input_msg.value}`}));
    input_msg.value = '';
    }
});
socket.on('enter',function(msg){
    let li = document.createElement('li');
    let span_1 = document.createElement('span');
    let span_2 = document.createElement('span');
    span_1.classList.add("f_size_b");
    span_1.innerHTML = "- "+msg;
    span_2.classList.add("f_size_1");
    span_2.innerHTML = " has entered -";
    li.appendChild(span_1);
    li.appendChild(span_2);
    board.appendChild(li);
})
socket.on('message', function(msg) {
    let txt = JSON.parse(msg)
    let li = document.createElement('li');
    let span_1 = document.createElement('span');
    let span_2 = document.createElement('span');
    let span_3 = document.createElement('span');
    span_1.classList.add("f_size_b");
    span_1.innerHTML = txt.id;
    span_2.innerHTML = " : ";
    span_2.classList.add("f_size_b");
    span_3.innerHTML = txt.msg;
    span_3.classList.add("f_size_1");
    
    li.appendChild(span_1);
    li.appendChild(span_2);
    li.appendChild(span_3);
    
    board.appendChild(li);
    board.scrollTo(0,board.scrollHeight);
});