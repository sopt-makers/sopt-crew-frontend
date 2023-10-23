import { useRef } from 'react';
import { styled } from 'stitches.config';

interface FeedCommentEditorProps {
  defaultValue: string;
  onCancel: () => void;
  onSubmit: (newComment: string) => void;
}

export default function FeedCommentEditor({ defaultValue, onCancel, onSubmit }: FeedCommentEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = () => {
    onSubmit(editorRef.current?.value || '');
  };

  return (
    <EditorContainer>
      <Editor ref={editorRef} defaultValue={defaultValue} />
      <ButtonWrapper>
        <CancelButton onClick={onCancel}>취소</CancelButton>
        <SubmitButton onClick={handleSubmit}>수정</SubmitButton>
      </ButtonWrapper>
    </EditorContainer>
  );
}

const EditorContainer = styled('div', {
  padding: '12px 12px 14px 12px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  border: `1px solid $white`,
  background: '$black100',
});
const Editor = styled('textarea', {
  color: '$gray40',
  fontStyle: 'B2',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  resize: 'none',
});
const ButtonWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '4px',
  gap: '6px',
});
const CancelButton = styled('button', {
  padding: '4px 12px',
  flexType: 'center',
  borderRadius: '8px',
  background: '$black60',
  color: '$gray10',
  fontStyle: 'T5',
});
const SubmitButton = styled('button', {
  padding: '4px 12px',
  flexType: 'center',
  background: '$gray10',
  borderRadius: '8px',
  color: '$black100',
  fontStyle: 'T5',
});
