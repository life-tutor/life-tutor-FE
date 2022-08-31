import React, { useRef, useState } from "react";
import instance from "../../shared/axios";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AiOutlineLike } from "react-icons/ai";

const CommentCard = ({ data, postingId }) => {
  const commentEditInput = useRef();
  const queryClient = useQueryClient();
  console.log(data);

  const [commentEditState, setCommentEditState] = useState(false);

  // 로그인한 유저의 닉네임 가져오기
  const loginNickname = "테스트용12";

  // 댓글 기능관련
  const editComment = async (commentId) => {
    const comment = { content: commentEditInput.current.value };
    await instance.put(`/api/board/${postingId}/comment/${commentId}`, comment);
  };

  const { mutate: commentEditHandler } = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("post");
    },
  });

  const deleteComment = async (commentId) => {
    const result = window.confirm("댓글을 삭제하시겠습니까?");
    if (result) {
      await instance.delete(`/api/board/${postingId}/comment/${commentId}`);
    }
  };

  const { mutate: commentDelHandler } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("post");
    },
  });

  const commentLike = async () => {
    if (data.like === true) {
        console.log("dd")
      return await instance.delete(
        `/api/comment/${data.id}/likes`
      );
    } else {
        console.log("ss")
      return await instance.post(
        `/api/comment/${data.id}/likes`
      );
    }
  };

  const { mutate: commentlikeHandler } = useMutation(commentLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("post");
    },
  });

  // 시간세팅
  const timeSet = (value) => {
    const milliSeconds = new Date() - new Date(value);
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

  return (
    <>
      <Comment>
        <CommentWriter>
          <p>{data.nickname}</p>
          <p>{data.user_type}</p>
        </CommentWriter>
        <CommentContent>{data.content}</CommentContent>
        <CommentContentEdit state={commentEditState}>
          <CommentArea ref={commentEditInput}></CommentArea>
          <CommentEditCancelAndSaveBtn>
            <CommentEditCancelBtn
              onClick={() => {
                setCommentEditState(false);
              }}
            >
              취소
            </CommentEditCancelBtn>
            <CommentEditSaveBtn
              onClick={() => {
                commentEditHandler(`${data.id}`);
                setCommentEditState(false);
              }}
            >
              저장
            </CommentEditSaveBtn>
          </CommentEditCancelAndSaveBtn>
        </CommentContentEdit>
        <CommentLikeAndEditDelBox>
          {data.nickname === loginNickname ? (
            <>
              <CommentDateAndLikeBox>
                <p>{timeSet(data.date)}</p>
                <CommentLikeFalseBtn>
                  <AiOutlineLike />
                  {data.like_count}
                </CommentLikeFalseBtn>
              </CommentDateAndLikeBox>
              <CommentEditAndDelBox state={commentEditState}>
                <CommentEdit
                  onClick={() => {
                      setCommentEditState(true);
                      commentEditInput.current.value = data.content;
                  }}
                >
                  수정
                </CommentEdit>
                <CommentDel
                  onClick={() => {
                    commentDelHandler(`${data.id}`);
                  }}
                >
                  삭제
                </CommentDel>
              </CommentEditAndDelBox>
            </>
          ) : data.like === true ? (
            <>
              <CommentDateAndLikeBox>
                <p>{timeSet(data.date)}</p>
                <CommentLikeTrueBtn
                  onClick={() => {
                    commentlikeHandler(`${data.id}`);
                  }}
                >
                  <AiOutlineLike />
                  {data.like_count}
                </CommentLikeTrueBtn>
              </CommentDateAndLikeBox>
            </>
          ) : (
            <>
              <CommentDateAndLikeBox>
                <p>{timeSet(data.date)}</p>
                <CommentLikeFalseBtn
                  onClick={() => {
                    commentlikeHandler(`${data.id}`);
                  }}
                >
                  <AiOutlineLike />
                  {data.like_count}
                </CommentLikeFalseBtn>
              </CommentDateAndLikeBox>
            </>
          )}
        </CommentLikeAndEditDelBox>
      </Comment>
    </>
  );
};

export default CommentCard;

const Comment = styled.div`
  padding: 10px 20px;
  text-align: left;
  line-height: 2rem;
  margin: 0 auto;
  box-sizing: border-box;
  border-bottom: 1px solid #e6e6e6;
`;

const CommentWriter = styled.div`
  display: flex;
  gap: 7px;
  font-weight: bold;
  font-size: 15px;
  color: #656565;
  p:last-child {
    color: #3549ff;
  }
`;

const CommentContent = styled.div`
  font-size: 16px;
`;

const CommentContentEdit = styled.div`
  display: ${(props) => (props.state ? "block" : "none")};
`;

const CommentArea = styled.textarea`
  border: none;
  resize: none;
  width: 94%;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  outline-color: #3549ff;
  margin: 0 auto;
`;

const CommentEditCancelAndSaveBtn = styled.div`
  display: flex;
  justify-content: right;
  gap: 10px;
`;

const CommentEditCancelBtn = styled.div`
  width: 50px;
  text-align: center;
`;

const CommentEditSaveBtn = styled.div`
  width: 50px;
  background: #3549ff;
  text-align: center;
  color: white;
`;

const CommentLikeAndEditDelBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentDateAndLikeBox = styled.div`
  display: flex;
  gap: 10px;
  color: #656565;
  p:last-child {
    display: flex;
    align-items: center;
    gap: 3px;
  }
`;

const CommentEditAndDelBox = styled.div`
  display: ${(props) => (props.state ? "none" : "flex")};
  justify-content: space-between;
  gap: 10px;
  color: #3549ff;
`;

const CommentEdit = styled.div``;

const CommentDel = styled.div``;

const CommentLikeFalseBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
`;

const CommentLikeTrueBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 3px;
  color: #3549ff;
`;
