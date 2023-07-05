import React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Messages } from './Messages';

// export const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')


export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string

}


const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket;

        const closeHandler = () => {
            console.log('WS closed');
            setTimeout(createWsChannel, 3000);
        }

        function createWsChannel() {

            ws?.removeEventListener('close', closeHandler)
            ws?.close()

            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            setWsChannel(ws)
            ws.addEventListener('close', closeHandler)
        }

        createWsChannel()

        return () => {
            ws.removeEventListener('close', closeHandler)
            ws.close()
        }
    }, [])


    return (
        <div>
            <Messages ws={wsChannel} />
            <AddMessageForm ws={wsChannel} />
        </div>
    )
}



export const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {

    return (
        <div>
            <img width='100' height='100' src={message.photo} alt="" /><b>{message.userName}</b>
            <br />
            {message.message}
        </div>
    )
}



const AddMessageForm: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {

    const [message, setMessage] = useState('')
    const [readyStatus, setreadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        const openHandler = () => {
            setreadyStatus('ready')
        }
        ws?.addEventListener('open', openHandler)
        return () => {
            ws?.removeEventListener('open', openHandler)
        }
    }, [ws])

    const sendMessage = () => {
        if (!message) return
        ws?.send(message)
        setMessage('')
    }

    return (
        <div>
            <div>
                <textarea onChange={e => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button disabled={ws === null || readyStatus !== 'ready'} onClick={sendMessage}>send</button>
            </div>
        </div>
    )
}

export default ChatPage;