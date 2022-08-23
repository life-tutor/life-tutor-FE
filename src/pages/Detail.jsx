import React, { useRef } from "react";
import instance from "../shared/axios";
import styled from "styled-components";
import NomalBadge from '../components/hashtag/NomalBadge';
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsChevronLeft } from "react-icons/bs";
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import CommentCard from "../components/card/CommentCard";
import SubmitForm from "../components/submitForm/SubmitForm";

// TODO: 댓글 수정기능, 댓글 좋아요확인, 게시글 본문 줄바꿈처리
// FIXME: 
// 좋아요 했던 게시글 표시 (스테이트) ? 옵셔널체이닝
// https://mockapi.io/

const Detail = () => {
  const params = useParams();
  const commentInput = useRef();
  const navigate = useNavigate();
  const postingId = params.postingId;
  const queryClient = useQueryClient();
  
  // 로그인한 유저의 닉네임 가져오기
  const loginNickname = '테스트용';

  // 게시글 불러오기
  const getPost = async () => {
    const res = await instance.get(`/api/board/detail/${postingId}`);
    return res.data;
  };

  const { data } = useQuery(["post"], getPost, {
    refetchOnWindowFocus: false,
  });

  console.log(data);

  // 게시글 기능관련
  const editPostingHandler = async () => {
    const result = window.confirm("게시글을 수정하시겠습니까?");
    if (result) {
    // navigate(`/edit/${postingId}`);  
    }
  };

  const deletePostingHandler = async () => {
    const result = window.confirm("게시글을 삭제하시겠습니까?");
    if (result) {
      await instance.delete(`/api/board/${postingId}`);
      return navigate("/home/postings");
    }
  };

  const contentLike = async () => {
    if (data.like === true) {
    return await instance.delete(`/api/board/${postingId}/likes`);
    } else {
    return await instance.post(`/api/board/${postingId}/likes`);
    }
  }

  const { mutate : contentlikeHandler } = useMutation(contentLike, {
    onSuccess: () => {
      queryClient.invalidateQueries("post");
    }
  })

  // 시간세팅
  const timeSet = (value) => {
    const milliSeconds = new Date() - new Date(value);
    const seconds = milliSeconds / 1000;
    if(seconds < 60) return `방금 전`
    const minutes = seconds / 60
    if (minutes < 60) return `${Math.floor(minutes)}분 전`
    const hours = minutes / 60
    if (hours < 24) return `${Math.floor(hours)}시간 전`
    const days = hours / 24
    if (days < 7) return `${Math.floor(days)}일 전`
    const weeks = days / 7
    if (weeks < 5) return `${Math.floor(weeks)}주 전`
    const months = days / 30
    if (months < 12) return `${Math.floor(months)}개월 전`
    const years = days / 365
    return `${Math.floor(years)}년 전`
  }

  return (
    <>
      <HeaderBox>
        <BackBtn
          onClick={() => {
            navigate(-1);
          }}
        >
          <BsChevronLeft />
        </BackBtn>
        <HeaderInfo>헤더 부분</HeaderInfo>
        <EditAndDelBtn>
          {data.nickname === loginNickname ? (
            <>
              <EditBtn
                onClick={() => {
                  editPostingHandler();
                }}
              >
                수정
              </EditBtn>
              <DelBtn
                onClick={() => {
                  deletePostingHandler();
                }}
              >
                삭제
              </DelBtn>
            </>
          ) : null}
        </EditAndDelBtn>
      </HeaderBox>
      <ContentBox>
        <TitleAndWriterBox>
          <Title>
            <p>{data.title}</p>
          </Title>
          <WriterAndTimeBox>
            <Writer>
              <p>{data.nickname}</p>
              <p>{data.user_type}</p>
            </Writer>
            <TimeBox>{timeSet(data.date)}</TimeBox>
          </WriterAndTimeBox>
        </TitleAndWriterBox>
        <ContentAndHashtagBox>
          <Content>
            <p>{data.posting_content}</p>
          </Content>
          <Hashtag>
            {data.hashtag.map((d, idx) => (
              <NomalBadge key={idx}>#{d}</NomalBadge>
            ))}
          </Hashtag>
        </ContentAndHashtagBox>
        <CommentCountAndLikeCountBox>
          <CommentCount>
            <IoChatboxEllipsesOutline />{data.comments.length}
          </CommentCount>
        {data.nickname === loginNickname ? (
          <>
            <ContentLikeFalseBtn><AiOutlineLike />{data.like_count}</ContentLikeFalseBtn>
          </>
        ) : (
          data.like ? (
          <>
            <ContentLikeTrueBtn onClick={() => {
                contentlikeHandler();
              }}>
              <AiOutlineLike />{data.like_count}
            </ContentLikeTrueBtn>
          </>
          ):(
          <>
            <ContentLikeFalseBtn onClick={() => {
                contentlikeHandler();
              }}>
              <AiOutlineLike />{data.like_count}
            </ContentLikeFalseBtn>
          </>
          )
        )}
        </CommentCountAndLikeCountBox>
      </ContentBox>

      <CommentBox>
        <CommentListBox>
          {data.comments.map((data, idx) => (
            <CommentCard key={idx} data={data} postingId={postingId} />
          ))}
        </CommentListBox>
      </CommentBox>

      <SubmitForm postingId={postingId} placeholderText="댓글을 남겨주세요." />
    </>
  );
};

export default Detail;

const HeaderBox = styled.div`
  width: 100%;
  height: 95px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  border-bottom: 0.5px solid #d3d3d3;
  box-sizing: border-box;
`;

const BackBtn = styled.div`
  margin: 0 0 16px 20px;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const HeaderInfo = styled.div`
  position: absolute;
  left: 159px;
  top: 57px;
  width: 69px;
  height: 27px;
`;

const EditAndDelBtn = styled.div`
  margin: 0 20px 16px 0;
  gap: 10px;
  display: flex;
`;

const EditBtn = styled.div`
  cursor: pointer;
  width: 50%;
  height: 3rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
`;

const DelBtn = styled.div`
  cursor: pointer;
  width: 50%;
  height: 3rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
`;

const ContentBox = styled.div`
  background: white;
  width: 100%;
  border-bottom: 2px solid #D3D3D3;
`;

const TitleAndWriterBox = styled.div`
  border-bottom: 0.5px solid #E6E6E6;
  padding-bottom: 20px;
`;

const Title = styled.div`
  text-align: left;
  p {
    margin: 25px 20px;
    padding: 0;
    font-weight:500;
    font-size:20px;
  }
`;

const WriterAndTimeBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 20px;
  color: #656565;
`;

const Writer = styled.div`
  display: flex;
  gap: 10px;
  font-weight: bold;
  p:last-child {
    color: #3549FF;
  }
`;

const TimeBox = styled.div`
`;

const ContentAndHashtagBox = styled.div`
  text-align: left;
  border-bottom: 0.5px solid #E6E6E6;
  padding-bottom: 15px;
  box-sizing: border-box;
  p {
    margin: 0;
    padding: 0;
  }
`;

const Content = styled.div`
  margin: 20px;
  min-height: 200px;
`;

const Hashtag = styled.div`
  display: flex;
  gap: 7px;
  margin: 20px;
  font-size: 25px;
`;

const CommentCountAndLikeCountBox = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  gap: 30px;
  font-size: 20px;
  color: #656565;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ContentLikeTrueBtn = styled.div`
  padding: 0.3rem;
  color: #3549FF;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ContentLikeFalseBtn = styled.div`
  padding: 0.3rem;
  color: #656565;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const CommentBox = styled.div`
  background: white;
  border-top: 9px solid #EEEEEE;
  margin-bottom: 63px;
`;

const CommentListBox = styled.div`
  width: 100%;
  margin: 0 auto;
`;
