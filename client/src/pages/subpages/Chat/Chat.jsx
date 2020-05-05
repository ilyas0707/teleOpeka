import React from "react"
import "./Chat.css"
import { Widget, addResponseMessage } from 'react-chat-widget';
 
import 'react-chat-widget/lib/styles.css';

const Chat = () => {

    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`)
        addResponseMessage("Здравствуйте, скоро лечащий врач с вами свяжется")
    }
    
    return(
        <div className="chat">
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                title="Чат"
                subtitle="Лечащий врач" />
        </div>
    )
}

export default Chat