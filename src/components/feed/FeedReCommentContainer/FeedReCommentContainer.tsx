import { useDeleteCommentMutation, usePostCommentReportMutation, usePutCommentMutation } from '@api/comment/hook';
import { GetCommentListResponse } from '@api/comment/type';
import { PostCommentWithMentionRequest } from '@api/mention';
import { useMutationPostCommentWithMention } from '@api/mention/hooks';
import { useUserProfileQuery } from '@api/user/hooks';
import AlertIcon from '@assets/svg/alert-triangle.svg';
import ReWriteIcon from '@assets/svg/comment-write.svg';
import RecommentPointIcon from '@assets/svg/recomment_point_icon.svg';
import TrashIcon from '@assets/svg/trash.svg';
import ConfirmModal from '@components/modal/ConfirmModal';
import { parseTextToLink } from '@components/util/parseTextToLink';
import { useOverlay } from '@hooks/useOverlay/Index';
import { useRouter } from 'next/router';
import { useState } from 'react';
import FeedActionButton from '../FeedActionButton/FeedActionButton';
import FeedCommentEditor from '../FeedCommentEditor/FeedCommentEditor';
import FeedCommentViewer from '../FeedCommentViewer/FeedCommentViewer';
interface FeedReCommentContainerProps {
  comment: GetCommentListResponse['comments'][number];
  reply: GetCommentListResponse['comments'][number]['replies'][number];
  isMine: boolean;
  postUserId: number;
  onClickLike: (commentId: number) => void;
}

const FeedReCommentContainer = ({ comment, reply, postUserId, onClickLike }: FeedReCommentContainerProps) => {
  const { query } = useRouter();
  const overlay = useOverlay();
  const [replyEditMode, setReplyEditMode] = useState(false);
  const { data: me } = useUserProfileQuery();
  const { mutate: mutateDeleteComment } = useDeleteCommentMutation(query.id as string);
  const { mutate: mutatePostCommentWithMention } = useMutationPostCommentWithMention({});
  const { mutate: mutateReportComment } = usePostCommentReportMutation();
  const { mutateAsync: mutateEditComment } = usePutCommentMutation(Number(query.id));

  const handleSubmitComment = async (req: PostCommentWithMentionRequest) => {
    await mutateEditComment({ commentId: reply.id, contents: req.content });
    mutatePostCommentWithMention(req);
    setReplyEditMode(false);
  };

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
