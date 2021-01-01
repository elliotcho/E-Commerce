import React from 'react';
import socketIOClient from 'socket.io-client';
import { ThemeContext } from '../../contexts/ThemeContext';
import { API } from '../../constants';
import Sidebar from './Sidebar';
import ChatHeader from './ChatHeader';
import ChatContainer from './ChatContainer';
import SendMessage from './SendMessage';
import './css/MessageCenter.css';

const lightStyle = { backgroundColor: '#8ec6c5'};
const darkStyle = { backgroundColor: '#34626c' };

const wsEndpoint = `${API}`;
let socket;

class MessageCenter extends React.Component{
    static contextType = ThemeContext;

    constructor(){
        super();
        socket = socketIOClient(wsEndpoint);
    }

    componentDidMount(){
        socket.emit('JOIN', {
            token: localStorage.getItem('token')
        });

        if(this.props.match.params.userId){

        }
    }

    componentDidUpdate(prevProps){
        const { userId } = this.props.match.params;

        if(userId && userId !== prevProps.match.params.userId){

        }
    }

    async readMessages(userId){

    }

    componentWillUnmount(){
        socket.emit('DISCONNECT', {
            token: localStorage.getItem('token')
        });

        socket.disconnect();
    }

    render(){
        const { match: { params: { userId } } } = this.props;
        const { isDark } = this.context;

        const style = isDark? darkStyle: lightStyle;

        return(
            <div className='message-center' style={style}>
                <Sidebar userId={userId} />      
    
                <main>
                    {userId && (
                        <>
                            <ChatHeader userId = {userId}/>
                            <ChatContainer userId = {userId} />
                            <SendMessage userId={userId}/>
                        </>
                    )}
                </main>    
            </div>
        )
    }
}

export { socket };
export default MessageCenter;