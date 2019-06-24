import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import WithAuth from '../hocs/WithAuth'
import io from 'socket.io-client';


class MessageSender extends React.Component {
    state = {
        content: []
    };

    constructor(props) {
        super(props);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleFormSubmit  = (e) => {
        e.preventDefault();
        this.socket.emit('msg', this.state.content);


    };

    async componentDidMount() {
        this.socket = io('http://localhost:3000');
    }


    static getInitialProps = async () => {
        return {};
    };

    render() {
        return <form onSubmit={this.handleFormSubmit}>
            <TextField
            id="standard-multiline-flexible"
            label="Multiline"
            multiline
            name="content"
            onChange={this.handleInputChange}
            rowsMax="4"
            /*onChange={handleChange('multiline')}*/
            margin="normal"
        />
        <Button type='submit' color="primary" variant='contained'>
            Envoyer
        </Button>
        </form>
    }
}

export default WithAuth(MessageSender);
