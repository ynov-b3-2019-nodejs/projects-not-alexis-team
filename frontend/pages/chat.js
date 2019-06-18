import Message from "../components/Message";
import http from '../utils/Axios';
import WithAxios from '../hocs/WithAxios'


async function Chat({ messages }) {
    const displayedMessages = [];
    for (let i = 0; i < messages.length; i++) {
        displayedMessages.push( <Message message={ messages[i] }/>)
    }
    return displayedMessages;
}


Chat.getInitialProps = async () => {
    try {
        const response = await http.get('http://backend:3500/messages');
        return {
            messages: response.data
        }
    }catch (e) {
        return {
            messages :[]
        }
    }
};

export default WithAxios(Chat);
