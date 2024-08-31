import React, { useState } from 'react';
import RecommentPointIcon from '@assets/svg/recomment_point_icon.svg';
import FeedCommentViewer from '../FeedCommentViewer/FeedCommentViewer';
import FeedActionButton from '../FeedActionButton/FeedActionButton';
import { useOverlay } from '@hooks/useOverlay/Index';
import ConfirmModal from '@components/modal/ConfirmModal';
import { useRouter } from 'next/router';
import { useDeleteComment } from '@api/post/hooks';
import FeedCommentEditor from '../FeedCommentEditor/FeedCommentEditor';
import { PostCommentWithMentionRequest } from '@api/mention';
import { useMutationPostCommentWithMention } from '@api/mention/hooks';
import { apiV2 } from '@api/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paths } from '@/__generated__/schema2';
import { parseTextToLink } from '@components/util/parseTextToLink';

interface FeedReCommentContainerProps {
  comment: paths['/comment/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8']['comments'][number];
  reply: paths['/comment/v2']['get']['responses']['200']['content']['application/json;charset=UTF-8']['comments'][number]['replies'][number];
  isMine: boolean;
  postUserId: number;
  onClickLike: (commentId: number) => void;
}

const FeedReCommentContainer = ({ comment, reply, postUserId, onClickLike }: FeedReCommentContainerProps) => {
  const queryClient = useQueryClient();
  const { PUT } = apiV2.get();
  const { query } = useRouter();

  const overlay = useOverlay();
  const [replyEditMode, setReplyEditMode] = useState(false);

  const { mutate: mutateDeleteComment } = useDeleteComment(query.id as string);
  const { mutate: mutatePostCommentWithMention } = useMutationPostCommentWithMention({});
  const { mutateAsync: mutateEditComment } = useMutation({
    mutationFn: (contents: string) =>
      PUT('/comment/v2/{commentId}', { params: { path: { commentId: reply.id } }, body: { contents } }),
    onSuccess: () => queryClient.invalidateQueries(['/comment/v1', query.id]),
  });

  const handleSubmitComment = async (req: PostCommentWithMentionRequest) => {
    await mutateEditComment(req.content);
    mutatePostCommentWithMention(req);
    setReplyEditMode(false);
  };
  return (
    <div style={{ display: 'flex' }}>
      <RecommentPointIcon style={{ marginRight: '12px' }} />
      <FeedCommentViewer
        key={reply.id}
        comment={reply}
        commentParentId={comment.id}
        Actions={[
          <FeedActionButton onClick={() => setReplyEditMode(true)}>수정</FeedActionButton>,
          <FeedActionButton
            onClick={() =>
              overlay.open(({ isOpen, close }) => (
                // eslint-disable-next-line prettier/prettier
                <ConfirmModal
                  isModalOpened={isOpen}
                  message="댓글을 삭제하시겠습니까?"
                  cancelButton="돌아가기"
                  confirmButton="삭제하기"
                  handleModalClose={close}
                  handleConfirm={() => {
                    mutateDeleteComment(reply.id);
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
          replyEditMode ? (
            <FeedCommentEditor
              defaultValue={reply.contents}
              onCancel={() => setReplyEditMode(false)}
              onSubmit={handleSubmitComment}
            />
          ) : (
            parseTextToLink(reply.contents)
          )
        }
        isMine={reply.isWriter}
        isPosterComment={postUserId === reply.user.id}
        onClickLike={() => onClickLike(reply.id)}
      />
    </div>
  );
};

export default FeedReCommentContainer;
