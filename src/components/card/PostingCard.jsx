import React from 'react';
import styled from 'styled-components';
import NomalBadge from '../hashtag/NomalBadge';
import { userTypeTrans } from '../../shared/sharedFn';
import { editPostingTime } from '../../shared/sharedFn';
import { AiOutlineLike } from 'react-icons/ai';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';

const PostingCard = ({post}) => {

    return(
        <PostingCardWrapper>
            <PostingCardBody>
            <PostingCardTitle>{post.title}</PostingCardTitle>
            <PostingCardContent>{post.posting_content}</PostingCardContent>
            <PostingCardHashtagArea>
                {post.hashtag.map((item, index) => <NomalBadge key={index}>{`# ${item}`}</NomalBadge>)}
            </PostingCardHashtagArea>
            <PostingCardUserInfo>
                <p style={{color:"#656565"}}>{post.nickname}</p>
                <p style={{color:"#3549FF"}}>{userTypeTrans(post.user_type)}</p>
            </PostingCardUserInfo>
            </PostingCardBody>
            <HRDiv/>
            <PostingCardFooter>
                <div className='posting-actions-icon'>
                    <p className='posting-actions-icon-wrapper posting-actions-icon-like'>
                        <AiOutlineLike/>
                        {post.like_count}
                    </p>
                    <p className='posting-actions-icon-wrapper'>
                        <IoChatboxEllipsesOutline/>
                        {post.comment_count}
                    </p>
                </div>
                <div className='posting-time'><p>{editPostingTime(post.date)}</p></div>
            </PostingCardFooter>
        </PostingCardWrapper>
    )
}

export default PostingCard;

const PostingCardWrapper = styled.div`
    width:100%;
    background:white;
    /* padding:20px; */
    box-sizing:border-box;
    margin:0 auto;
    box-shadow: 1px 1px 1px lightgray;
`

const PostingCardBody = styled.div`
    display:flex;
    flex-direction:column;
    gap:15px;
    padding:20px;
    box-sizing:border-box;
`

const PostingCardTitle = styled.div`
    font-size:18px;
    
    font-weight:500;
    line-height: 22px;
`

const PostingCardContent = styled.p`
    font-weight:500;
    font-size:11px;
    
    letter-spacing: -0.3px;
    line-height: 16px;
    color:${({ theme }) => theme.colors.lightGray};
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    overflow:hidden;
`

const PostingCardHashtagArea = styled.div`
    width:100%;
    display:flex;
    flex-wrap:wrap;
    gap:5px;
`

const HRDiv = styled.div`
    width:100%;
    height:1px;
    border:1px solid;
    border-color:${({theme}) => theme.colors.hrGray};
    box-sizing:border-box;
    margin-bottom:15px;

`

const PostingCardUserInfo = styled.div`
    display:flex;
    gap:8px;
    width:100%;
    p {
        margin:0;
        color:gray;
        font-weight:700;
        font-size:13px;
    }
`

const PostingCardFooter = styled.div`
    display:flex;
    padding:0 20px 20px 20px;
    align-items:center;
    p {
        margin:0;
        color:gray;
    }
    .posting-actions-icon {
        display:flex;
        gap:10px;
        flex:1;

        .posting-actions-icon-wrapper {
            display:flex;
            align-items:center;
            gap:3px;
        }

        .posting-actions-icon-like {
            /* color:blue; */
        }
    }
    .posting-time {
        color:${({theme}) => theme.colors.darkGray};
        font-weight:500;
        font-size:12px;
        letter-spacing:-0.3px;
    }

`