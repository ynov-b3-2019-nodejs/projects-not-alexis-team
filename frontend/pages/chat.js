import Message from "../components/Message";
import axios from 'axios';
import WithAuth from '../hocs/WithAuth'
import * as React from "react";


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
        })
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

        return displayedMessages;
    }
}

export default WithAuth(Chat);
