import { useState, useEffect } from "react";
import { ChatMessageType, Message } from "./ChatPage";



// проблема - страница не грузится при переходе на нее с других роутеров




export const Messages: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])


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
        <div style={{ height: '500px', overflowY: 'auto' }}>
            {messages.map((m, index) =>
                <Message
                    key={index}
                    message={m}
                // key={Math.random() + m.userId}
                />)}
        </div>
    )
}