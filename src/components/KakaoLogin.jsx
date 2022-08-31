import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function KakaoLogin() {
  const params = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
  if(params.token === "fail"){
    alert("로그인에 실패했습니다ㅠㅠ 카카오 이메일 제공 동의가 필요합니다!")
    navigate('/login');
  } else {
    localStorage.setItem("Authorization", `BEARER ${params.token}`);
    console.log(localStorage.Authorization);
    navigate('/viewer/posting/list')
  
  };
  

  }, []);
  
  return <></>;
  }

export default KakaoLogin;