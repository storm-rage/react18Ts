import styled from "styled-components";

export const LoginWrapper = styled.div`
  background: rgb(35, 39, 65);
  height: 100%;
  overflow: hidden;
  .login-window {
    position: fixed;
    background-color: rgba(255, 255, 255, 1);
    width: 500px;
    height: 340px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    z-index: 100;
    border-radius: 20px;
  }
  .logintitle {
    color: #333;
    text-align: center;
    height: 80px;
    line-height: 80px;
    font-size: 30px;
  }
  .view-news {
    display: flex;
    justify-content: end;
  }
`;
