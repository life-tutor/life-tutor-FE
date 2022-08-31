import React, { useRef, useEffect } from 'react'
import styled from 'styled-components';
import instance from '../../shared/axios';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from 'react-router-dom';

import { BiRightArrowCircle } from 'react-icons/bi';


const SubmitForm = ({ postingId, placeholderText, sendMsg }) => {
    const commentInput = useRef();
    const queryClient = useQueryClient();
    const location = useLocation();

    console.log('render');

    const addComment = async () => {
        const comment = { "content": commentInput.current.value };
        return await instance.post(`/api/board/${postingId}/comment`, comment);
    }
    
    const { mutate : commentAddHandler } = useMutation(addComment, {
    onSuccess: () => {
        queryClient.invalidateQueries("post");
        commentInput.current.value = "";
    }
    })

    const submitButtonHandler = (e) => {
      if(!commentInput.current.value) return;

      e.preventDefault();
      if(location.pathname.includes("/detail/room/chat")) {
        sendMsg(commentInput.current.value);
        // commentInput.current.focus();
      }
      else commentAddHandler();
    }

  return (
    <>
    <CommentAddBox>
        <CommentInputBox>
          <input type="text" placeholder={placeholderText} ref={commentInput} />
          <CommentAddBtn
            onClick={submitButtonHandler}
          >
            <BiRightArrowCircle />
          </CommentAddBtn>
        </CommentInputBox>
      </CommentAddBox>
    </>
  )
}

export default React.memo(SubmitForm);

const CommentAddBox = styled.div`
  background: #EFEFEF;
  width: 100%;
  height: 63px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
`;

const CommentInputBox = styled.div`
  width: 90%;
  height: 44px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #D8D8D8;
  border-radius: 30px;
  gap: 5px;
  background: white;
  input {
    border: none;
    width: 80%;
    height: 30px;
    background: transparent;
  }
`;

const CommentAddBtn = styled.div`
  margin-top: 5px;
  cursor: pointer;
  color: #3549FF;
  font-size: 30px;
`;