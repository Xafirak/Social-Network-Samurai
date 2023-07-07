import { Button } from '@mui/material';
import React from 'react';
import { useEffect, useState } from 'react';
import { Messages } from './Messages';
import classes from './ChatPage.module.css'
import { useSelector } from 'react-redux';
import { AppStateType } from '../../redux/reduxStore';
import { useNavigate } from 'react-router-dom';



const ChatPage: React.FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: React.FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth === false) navigate('/login')
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
    }, [isAuth])


    return (
        <div>
            <Messages ws={wsChannel} />
            <AddMessageForm ws={wsChannel} />
        </div>
    )
}





const AddMessageForm: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
    const [message, setMessage] = useState('')
    const [readyStatus, setreadyStatus] = useState<'pending' | 'ready'>('pending')
    const [drag, setDrag] = useState(false)



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

    function dragStartHandler(e: React.DragEvent<HTMLTextAreaElement>) {
        e.preventDefault()
        setDrag(true)
    }

    function dragLeaveHandler(e: React.DragEvent<HTMLTextAreaElement>) {
        e.preventDefault()
        setDrag(false)
    }

    return (
        <div>
            <div>
                <textarea
                    onDragStart={e => dragStartHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragOver={e => dragStartHandler(e)}
                    placeholder='Напиши что-нибудь...'
                    rows={6}
                    cols={50}
                    onChange={e => setMessage(e.currentTarget.value)}
                    value={message}
                    onKeyDown={e => e.key === 'Enter' ? sendMessage() : null}
                ></textarea>
            </div>
            <div className={classes.BtnWrapper}>
                <Button
                    variant='contained'
                    color='inherit'
                    disabled={ws === null || readyStatus !== 'ready'}
                    onClick={sendMessage}
                >
                    Send
                </Button>
                {/* <button disabled={ws === null || readyStatus !== 'ready'} onClick={sendMessage}>send</button> */}
            </div>
        </div>
    )
}

export default ChatPage;