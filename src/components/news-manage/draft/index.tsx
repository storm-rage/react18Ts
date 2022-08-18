import React, { memo, useState, useEffect } from "react";
import { ContentState } from "draft-js";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { DraftWrapper } from "./style";

interface TProps {
  getContent: (content: any) => void;
  defaultTxt: string;
}

const DraftCustom = memo((props: TProps) => {
  const { defaultTxt } = props;
  const [editorState, setEditorState] = useState<EditorState>();
  useEffect(() => {
    if (defaultTxt === undefined) return;
    const contentBlock = htmlToDraft(defaultTxt);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [defaultTxt]);

  return (
    <DraftWrapper>
      <Editor
        editorState={editorState}
        toolbarClassName="editor-toolbar"
        wrapperClassName="editor-wrapper"
        editorClassName="editor-edit"
        onEditorStateChange={(editorState) => setEditorState(editorState)}
        onBlur={() => {
          props.getContent(
            draftToHtml(
              convertToRaw((editorState as EditorState).getCurrentContent())
            )
          );
        }}
      />
    </DraftWrapper>
  );
});

export default DraftCustom;
