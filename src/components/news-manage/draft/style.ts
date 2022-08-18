import styled from "styled-components";

export const DraftWrapper = styled.div`
  height: 600px;
  .editor-wrapper {
    height: calc(100% - 80px);
    padding: 0 10px;
  }
  .editor-edit {
    margin-top: 13px;
    overflow: auto;
    border: 1px solid #ccc;
    .DraftEditor-root {
      height: auto;
    }
  }
`;
