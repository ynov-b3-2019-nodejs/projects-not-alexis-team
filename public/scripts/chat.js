$('#new-message-btn').click((e) => {
    console.log('new-message');
    const msg = $('#new-message').val();
    if(msg) {
        socket.emit('msg',msg);
    }
});

socket.on('msg-bd',(msg) => {
    console.log(msg);
    let message = $('.message').last();
    let newMessage = message.clone();
    $(newMessage).children('.message-content').text(msg.content);
    $(newMessage).children('.message-sender').text(msg.user.firstname + msg.user.lastname);
    $(newMessage).children('.message-date').text(new Date(msg.createdAt).toLocaleString());
    $('.messages').append(newMessage);


   alert(msg);
});
$('.message .message-date').each((i,o) => {
    console.log(o);
    $(o).text(new Date($(o).text()).toLocaleString());
});