import { useRef, useState } from 'react';
import { styled } from 'stitches.config';
import { PostCommentWithMentionRequest } from '@api/mention';
import CommonMention from '../Mention';

interface FeedCommentEditorProps {
  defaultValue: string;
  onCancel: () => void;
  onSubmit: (req: PostCommentWithMentionRequest) => Promise<void>;
}

export default function FeedCommentEditor({ defaultValue, onCancel, onSubmit }: FeedCommentEditorProps) {
  const editorRef = useRef<HTMLTextAreaElement | null>(null);
  const [comment, setComment] = useState(defaultValue);
  const [userIds, setUserIds] = useState<number[] | null>(null);
  // 현재 URL에서 쿼리 파라미터를 가져오기
  const urlParams = new URLSearchParams(window.location.search);

  // 'id' 파라미터 값 가져오기: api리퀘스트에서 보내야하는 postId값
  const postId = Number(urlParams.get('id'));

  const handleSubmit = () => {
    onSubmit({
      postId: postId as number,
      orgIds: userIds,
      content: comment,
    });
  };

  return (
    <EditorContainer onSubmit={e => e.preventDefault()}>
      <Editor>
        <CommonMention
          inputRef={editorRef}
          value={comment}
          setValue={setComment}
          setUserIds={setUserIds}
          setIsFocused={() => {}}
          isComment={true}
        ></CommonMention>
      </Editor>
      <ButtonWrapper>
        <CancelButton onClick={onCancel}>취소</CancelButton>
        <SubmitButton onClick={handleSubmit}>수정</SubmitButton>
      </ButtonWrapper>
    </EditorContainer>
  );
}

const EditorContainer = styled('form', {
  padding: '12px 12px 14px 12px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '8px',
  border: `1px solid $white`,
  background: '$gray950',
});
const Editor = styled('div', {
  minWidth: 0,
  width: '100%',
  padding: '11px 16px',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  resize: 'none',
  '@tablet': {
    position: 'relative',
  },
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
  background: '$gray700',
  color: '$gray10',
  fontStyle: 'T5',
});
const SubmitButton = styled('button', {
  padding: '4px 12px',
  flexType: 'center',
  background: '$gray10',
  borderRadius: '8px',
  color: '$gray950',
  fontStyle: 'T5',
});
