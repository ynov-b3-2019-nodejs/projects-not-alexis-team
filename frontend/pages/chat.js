import Message from "../components/Message";
import axios from "axios";

function Chat({ messages }) {
    console.log(messages);
    // const messages = [
    //     {
    //         date: new Date(),
    //         sender: {
    //             firstname: "Jules"
    //         },
    //         content: "tests",
    //         sent: true
    //     }, {
    //         date: new Date(),
    //         sender: {
    //             firstname: "Jules"
    //         },
    //         content: "tests",
    //         sent: false
    //     }
    // ];

    const displayedMessages = [];
    for (let i = 0; i < messages.length; i++) {
        displayedMessages.push( <Message message={ messages[i] }/>)
    }
    return displayedMessages;
}

Chat.getInitialProps = async () => {
    const response = await axios.get('http://backend:3500/messages');
    console.log(response.data);
    return {
        messages: response.data
    }
};
export default Chat;
