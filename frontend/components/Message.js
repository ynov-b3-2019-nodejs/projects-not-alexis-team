const Message = ({message}) => (
    <div>
        <div className={`message-content-wrapper ${ message.sent ? 'sent' : 'received'}`}>
            <div>
                <span className="message-date">{`${message.createdAt}`} &nbsp;</span>
                <span>par </span>&nbsp;
                <span className="message-sender">{message.user.firstname}</span>&nbsp;
            </div>
            <div className="message-content">
                {message.content}
            </div>
            </div>

        <style jsx>{`
            .message-content {
                border-radius: 10px;
                padding:10px;
                color: white;
                display: inline-block;
            }
            
            
            .received .message-content {
                background-color: #26a69a;
            }
            
            .sent .message-content {
                background-color: #ee6e73;
            }
            
            
            .message{
                display: flex;
                flex-direction: column;
            }
            
            .message.sent{
                align-items:flex-start;
            }
            
            .message.sent {
                align-items:flex-end;
            }
            
            .sent .message-content-wrapper {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
            }
            
            .messages-wrapper {
                max-height: 70vh;
                overflow: scroll;
            }
        `}

        </style>
    </div>

);

export default Message
