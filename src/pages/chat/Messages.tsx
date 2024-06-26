import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/reduxStore";
import { useChatScroll } from "../../utils/hooks/useChatScroll";
import classes from './Messages.module.css'

export const Messages: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])
    const ref = useChatScroll(messages)
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.userId)




    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages(prevMessages => [...prevMessages, ...newMessages]);
        }
        ws?.addEventListener('message', messageHandler)

        return () => {
            ws?.removeEventListener('message', messageHandler)
        }
    }, [ws])

    return (
        <div ref={ref} className={classes.messagesWindow}>
            {messages.map((m, index) =>
                <Message
                    key={index}
                    message={m}
                    authorId={authorizedUserId}
                />)}
        </div>
    )
}

export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string

}

export const Message: React.FC<{
    message: ChatMessageType,
    authorId: number | null
}> =
    ({ message, authorId }) => {

        return (
            <div className={classes.userMessage}>
                <div className={message.userId === authorId ? classes.authorMessage : ''}>
                    <img src={message.photo} alt="" />
                    <div className={classes.userMessage_name}>
                        <b>{message.userName}</b>
                    </div>
                    <div className={classes.userMessage_message}>
                        {message.message}
                    </div>
                </div>
            </div>
        )
    }


