import { paths } from '@/__generated__/schema';
import FeedCommentViewer from '../FeedCommentViewer/FeedCommentViewer';
import FeedActionButton from '../FeedActionButton/FeedActionButton';
import { useOverlay } from '@hooks/useOverlay/Index';
import ConfirmModal from '@components/modal/ConfirmModal';
import { useState } from 'react';
import { useDeleteComment } from '@api/post/hooks';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiV2 } from '@api/index';
import FeedCommentEditor from '../FeedCommentEditor/FeedCommentEditor';
import { parseTextToLink } from '@components/util/parseTextToLink';

interface FeedCommentContainerProps {
  comment: paths['/comment/v1']['get']['responses']['200']['content']['application/json']['data']['comments'][number];
  isMine: boolean;
  onClickLike: () => void;
}

export default function FeedCommentContainer({ comment, isMine, onClickLike }: FeedCommentContainerProps) {
  const queryClient = useQueryClient();
  const { PUT } = apiV2.get();
  const { query } = useRouter();
  const overlay = useOverlay();
  const [editMode, setEditMode] = useState(false);

  const { mutate: mutateDeleteComment } = useDeleteComment(query.id as string);

  const { mutateAsync: mutateEditComment } = useMutation({
    mutationFn: (contents: string) =>
      PUT('/comment/v1/{commentId}', { params: { path: { commentId: comment.id } }, body: { contents } }),
    onSuccess: () => queryClient.invalidateQueries(['/comment/v1', query.id]),
  });

  const handleSubmitComment = async (newComment: string) => {
    await mutateEditComment(newComment);
    setEditMode(false);
  };

  return (
    <FeedCommentViewer
      key={comment.id}
      comment={comment}
      Actions={[
        <FeedActionButton onClick={() => setEditMode(true)}>수정</FeedActionButton>,
        <FeedActionButton
          onClick={() =>
            overlay.open(({ isOpen, close }) => (
              // eslint-disable-next-line prettier/prettier
              <ConfirmModal isModalOpened={isOpen} message="댓글을 삭제하시겠습니까?" cancelButton="돌아가기" confirmButton="삭제하기"
                handleModalClose={close}
                handleConfirm={() => {
                  mutateDeleteComment(comment.id);
                  close();
                }}
              />
            ))
          }
        >
          삭제
        </FeedActionButton>,
      ]}
      Content={
        editMode ? (
          <FeedCommentEditor
            defaultValue={comment.contents}
            onCancel={() => setEditMode(false)}
            onSubmit={handleSubmitComment}
          />
        ) : (
          parseTextToLink(comment.contents)
        )
      }
      isMine={isMine}
      onClickLike={onClickLike}
    />
  );
}
