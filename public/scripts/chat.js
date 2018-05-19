$('#new-message-btn').click((e) => {
    console.log('new-message');
    const msg = $('#new-message').val();
    if(msg) {
        socket.emit('msg',msg);
    }
});

socket.on('msg-bd',(msg) => {
   alert(msg);
});