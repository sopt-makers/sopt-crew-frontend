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
import { api, apiV2 } from '@api/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paths } from '@/__generated__/schema2';
import { parseTextToLink } from '@components/util/parseTextToLink';
import ReWriteIcon from '@assets/svg/comment-write.svg';
import TrashIcon from '@assets/svg/trash.svg';
import AlertIcon from '@assets/svg/alert-triangle.svg';
import { useQueryMyProfile } from '@api/API_LEGACY/user/hooks';
import { useToast } from '@sopt-makers/ui';
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
  const { open } = useToast();

  const overlay = useOverlay();
  const [replyEditMode, setReplyEditMode] = useState(false);
  const { data: me } = useQueryMyProfile();
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

  const { mutate: mutateReportComment } = useMutation({
    mutationFn: (commentId: number) =>
      api.post<paths['/comment/v2/{commentId}/report']['post']['responses']['201']['content']['application/json']>(
        `/comment/v2/${reply.id}/report`,
        {}
      ),
    onSuccess: () => {
      open({
        icon: 'success',
        content: '댓글을 신고했습니다.',
      });
    },
    onError: () => {
      open({
        icon: 'error',
        content: '이미 신고한 댓글입니다.',
      });
    },
  });

  const isMine = reply.user.id === me?.id;
  return (
    <div style={{ display: 'flex' }}>
      <RecommentPointIcon style={{ marginRight: '12px' }} />
      <FeedCommentViewer
        key={reply.id}
        comment={reply}
        commentParentId={comment.id}
        Actions={
          isMine
            ? [
                <FeedActionButton onClick={() => setReplyEditMode(true)}>
                  <ReWriteIcon />
                  수정
                </FeedActionButton>,
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
                  <TrashIcon />
                  삭제
                </FeedActionButton>,
              ]
            : [
                <FeedActionButton
                  onClick={() => {
                    overlay.open(({ isOpen, close }) => (
                      // eslint-disable-next-line prettier/prettier
                      <ConfirmModal
                        isModalOpened={isOpen}
                        message="댓글을 신고하시겠습니까?"
                        cancelButton="돌아가기"
                        confirmButton="신고하기"
                        handleModalClose={close}
                        handleConfirm={() => {
                          mutateReportComment(reply.id);
                          close();
                        }}
                      />
                    ));
                  }}
                >
                  <AlertIcon />
                  신고
                </FeedActionButton>,
              ]
        }
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
