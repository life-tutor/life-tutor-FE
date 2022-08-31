import React, { useEffect, useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import * as StompJS from 'stompjs'
import instance from '../shared/axios';
import { userContext } from '../components/context/UserProvider';

import SubmitForm from '../components/submitForm/SubmitForm';
import MyBubble from '../components/speechBubble/MyBubble';
import OtherBubble from '../components/speechBubble/OtherBubble';
import Header from '../components/header/Header';



const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const chatRef = useRef(null);
    const tempRef = useRef(null);
    const context = useContext(userContext);
    const { userInfo } = context.state;
    const navigate = useNavigate();
    const roomId = useParams().roomId;
    const sock = new SockJS(`${process.env.REACT_APP_API_URL}/iting`) //TODO: url 넣기
    const client= StompJS.over(sock);


    const headers = {} // TODO: 토큰 말고 어떤걸 넣을지?
    useEffect(()=> {
        const enterRoom = async () => {
            const res = await instance.put(`/api/chat/room/${roomId}/enter`);
            const data = res.data;
        }

        enterRoom().catch(console.error);
       
        client.connect(headers, ()=> {
            
            client.send(`/api/pub/${roomId}`, {}, JSON.stringify({
                "enter":"ENTER",
                "messageType":"TEXT",
                "nickname":userInfo.nickname, // FIXME: 여기다가 nickname 넣기
            }))

            client.subscribe(`/api/sub/${roomId}`, (data) => {
                const newMessage = JSON.parse(data.body);
                setMessages((prev) => [...prev, newMessage]);
            })
        })

        return(()=> {
            disConnect();
        })
    }, []);

    useEffect(()=> {
        if(!userInfo.nickname) {
            /** 새로고침 시 나가기 API 넣기 */
            // navigate("/viewer/room");
        }
    }, [])

    useEffect(()=> {
        scrollToBottom();
    }, [messages])

    const disConnect = () => {
        client.disconnect(() => {
            client.unsubscribe();
        });
        // navigate('/viewer/posting/list');
    }

    const sendMsg = (messageText) => {
        const sendMessage = {
            "enter":"COMM",
            "messageType":"TEXT",
            "nickname":userInfo.nickname,
            "message":messageText
        }
        client.send(`/api/pub/${roomId}`, {}, JSON.stringify(sendMessage));
    }

    const scrollToBottom = () => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" })
    }


    return (
        <ChatRoomWrapper ref={tempRef}>
        <Header/>
        <ChatArea>
            {messages?.map((msg, index) => msg.nickname === userInfo.nickname ?
            <MyBubble messageTime={msg.time} key={index}>{msg.message}</MyBubble>:<OtherBubble messageTime={msg.time} key={index}>{msg.message}</OtherBubble>)}
            <div ref={chatRef} style={{height:"10px"}}></div>
        
        </ChatArea>
        <SubmitForm sendMsg={sendMsg}/>
        </ChatRoomWrapper>
        
    );
}

export default ChatRoom;

const ChatRoomWrapper = styled.div`
    padding-top:71px;
    padding-bottom:65px;
    width:100%;
    /* height:calc(100vh - 71px - 70px); */
    /* height:calc(100vh - 71px - 70px); */
    /* height:calc(100vh - 71px - 70px);
    display:flex;
    flex-direction:column;
    justify-content:flex-end; */
`

const ChatArea = styled.div`
    overflow-y:auto;
    /* height:calc(100vh - 71px - 70px); */
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    gap:10px;
    
`