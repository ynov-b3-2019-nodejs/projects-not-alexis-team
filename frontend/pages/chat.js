import Message from "../components/Message";
import axios from 'axios';
import WithAuth from '../hocs/WithAuth'
import * as React from "react";
import io from 'socket.io-client';
import MessageSender from "../components/MessageSender";


class Chat extends React.Component {
    state = {
        messages: []
    };

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        console.log(this.props);
        const response = await axios.get('http://localhost:3000/messages', this.props.httpConfig);

        this.setState({
            messages: response.data
        });

        this.socket = io('http://localhost:3000');

        this.socket.on('msg-bd',(msg) => {
            console.log(msg);
            this.setState({
                messages: [...this.state.messages, msg]
            });
            console.log(this.state.messages);
        });
    }


    static getInitialProps = async () => {
        return {};
    };

    render() {
        const displayedMessages = [];
        const messages = this.state.messages;
        if(messages) {
            for (let i = 0; i < messages.length; i++) {
                displayedMessages.push( <Message message={ messages[i] }/>)
            }
        }

        return (<div>
            <ul>{displayedMessages}</ul>
            <MessageSender/>
        </div>)
    }
}

export default WithAuth(Chat);
