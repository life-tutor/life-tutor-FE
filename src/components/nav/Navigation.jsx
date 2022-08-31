import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import IndexInfo from './NavIndexInfo';

const Navigation = () => {

    
    const navContentRef = useRef(null);

    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const iconClickHandler = (e) => {
        navigate(e.currentTarget.dataset.url);
    }

    useEffect(()=> {
        if(pathname === "/" || pathname.includes("/detail")) return;

        const childNodes = navContentRef.current.children;
        const navIndexInfo = [...IndexInfo];
        const index = navIndexInfo.findIndex((item) => item.path === pathname);
        
        for(let i of childNodes) {
            i.classList.remove('clicked');
        }
        
        if(index !== -1) childNodes[index].classList.add('clicked');
        
    }, [pathname])

    if (window.location.pathname === '/login')  return null;
    if (window.location.pathname === '/signup')  return null;

    if(pathname.includes("/detail")) return null;
    else if(pathname === "/") return null;

    return(
        <NavigationWrapper>
            <NavigationContent ref={navContentRef}>
                <p data-url="/viewer/posting/list" onClick={iconClickHandler}>
                    <svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.25 25.5837V13.5003H16.75V25.5837M1.75 9.87533L13 1.41699L24.25 9.87533V23.167C24.25 23.8079 23.9866 24.4226 23.5178 24.8758C23.0489 25.329 22.413 25.5837 21.75 25.5837H4.25C3.58696 25.5837 2.95107 25.329 2.48223 24.8758C2.01339 24.4226 1.75 23.8079 1.75 23.167V9.87533Z"
                        stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </p>
                <p data-url="/viewer/room" onClick={iconClickHandler} >
                    <svg width="26" height="30" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24.25 16.125C24.25 16.7659 23.9866 17.3806 23.5178 17.8338C23.0489 18.2871 22.413 18.5417 21.75 18.5417H6.75L1.75 23.375V4.04167C1.75 3.40073 2.01339 2.78604 2.48223 2.33283C2.95107 1.87961 3.58696 1.625 4.25 1.625H21.75C22.413 1.625 23.0489 1.87961 23.5178 2.33283C23.9866 2.78604 24.25 3.40073 24.25 4.04167V16.125Z"
                        stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </p>
                <p data-url="/posting" onClick={iconClickHandler}>
                    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.291 4.83377H4.83268C4.19174 4.83377 3.57705 5.08838 3.12384 5.5416C2.67063 5.99481 2.41602 6.6095 2.41602 7.25044V24.1671C2.41602 24.808 2.67063 25.4227 3.12384 25.8759C3.57705 26.3292 4.19174 26.5838 4.83268 26.5838H21.7493C22.3903 26.5838 23.005 26.3292 23.4582 25.8759C23.9114 25.4227 24.166 24.808 24.166 24.1671V15.7088M22.3535 3.02127C22.8342 2.54057 23.4862 2.27051 24.166 2.27051C24.8458 2.27051 25.4978 2.54057 25.9785 3.02127C26.4592 3.50197 26.7293 4.15395 26.7293 4.83377C26.7293 5.51359 26.4592 6.16557 25.9785 6.64627L14.4993 18.1254L9.66602 19.3338L10.8743 14.5004L22.3535 3.02127Z"
                        stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                </p>
                <p data-url="/mypage" onClick={iconClickHandler}>
                    <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 23.375V20.9583C21 19.6765 20.4732 18.4471 19.5355 17.5407C18.5979 16.6342 17.3261 16.125 16 16.125H6C4.67392 16.125 3.40215 16.6342 2.46447 17.5407C1.52678 18.4471 1 19.6765 1 20.9583V23.375M16 6.45833C16 9.12771 13.7614 11.2917 11 11.2917C8.23858 11.2917 6 9.12771 6 6.45833C6 3.78896 8.23858 1.625 11 1.625C13.7614 1.625 16 3.78896 16 6.45833Z"
                        stroke="#979797" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </p>
            </NavigationContent>
        </NavigationWrapper>
    )
}

export default Navigation;

const NavigationWrapper = styled.div`
    position:fixed;
    bottom:0;
    left:0;
    width:100%;
    max-width:480px;
    left: 50%;
    transform: translate(-50%, 0);
    margin:0 auto;
    height:71px;
    background:white;
    
`

const NavigationContent = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin:0 auto;
    width:calc(100% - 40px);
    max-width:480px;
    height:100%;
    background:white;

    p {
        display:flex;
        align-items:center;
        cursor:pointer;
        font-size:1.5rem;
        height:100%;
    }

    .clicked {
        path {
            stroke:${({theme}) => theme.colors.mainBlue};
        }
    }
`