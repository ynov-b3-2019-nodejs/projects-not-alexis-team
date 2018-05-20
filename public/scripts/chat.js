$('#new-message-btn').click((e) => {
    console.log('new-message');
    const msg = $('#new-message').val();
    if(msg) {
        socket.emit('msg',msg);
    }
});

socket.on('msg-bd',(msg) => {
    console.log(msg);
    let sent = msg.user.email === $('#user-mail').text();
    let sentOrReceivedClass = sent ? 'sent' : 'received';
    let message = $('.message').last();

    let newMessage = message.clone();
    newMessage.removeClass('sent');
    newMessage.removeClass('received');
    newMessage.addClass(sentOrReceivedClass);
    $(newMessage).find('.message-content').text(msg.content);
    $(newMessage).find('.message-sender').text(msg.user.firstname + msg.user.lastname);
    $(newMessage).find('.message-date').text(new Date(msg.createdAt).toLocaleString());

    $('.messages').append(newMessage);
    let messageWrapper = $('.messages-wrapper');
    messageWrapper[0].scrollTop = messageWrapper[0].scrollHeight;
});
$('.message .message-date').each((i,o) => {
    console.log(o);
    $(o).text(new Date($(o).text()).toLocaleString());
});