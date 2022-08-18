import styled from "styled-components";

export const AddWrapper: any = styled.div`
  .site-page-header {
    border: 1px solid rgb(235, 237, 240);
  }
  .step-wrapper {
    width: 80%;
    margin: 0 auto;
  }
  .steps-common {
    margin-top: "100px";
    padding: 10px;
  }
  .steps-basic {
    display: ${(props: any) => (props.current === 0 ? "block" : "none")};
    .step-from {
      width: 625px;
      margin: 0 auto;
    }
  }
  .steps-content {
    display: ${(props: any) => (props.current === 1 ? "block" : "none")};
  }
  .steps-save {
    display: ${(props: any) => (props.current === 2 ? "block" : "none")};
  }
`;
