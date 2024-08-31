import { ampli } from '@/ampli';
import { createPost } from '@api/post';
import { fetchMeetingListOfUserAttend } from '@api/API_LEGACY/user';
import { useQueryMyProfile } from '@api/API_LEGACY/user/hooks';
import ConfirmModal from '@components/modal/ConfirmModal';
import ModalContainer, { ModalContainerProps } from '@components/modal/ModalContainer';
import { zodResolver } from '@hookform/resolvers/zod';
import useModal from '@hooks/useModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDate } from '@utils/dayjs';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { styled } from 'stitches.config';
import FeedFormPresentation from './FeedFormPresentation';
import { FormCreateType, feedCreateSchema } from './feedSchema';
import useThrottle from '@hooks/useThrottle';
import { useToast } from '@sopt-makers/ui';
import { useRouter } from 'next/router';
import { useMutationPostPostWithMention } from '@api/mention/hooks';
import { parseMentionedUserIds } from '@components/util/parseMentionedUserIds';

const DevTool = dynamic(() => import('@hookform/devtools').then(module => module.DevTool), {
  ssr: false,
});

type CreateModalProps = ModalContainerProps;

function FeedCreateWithSelectMeetingModal({ isModalOpened, handleModalClose }: CreateModalProps) {
  const queryClient = useQueryClient();
  const { open } = useToast();
  const router = useRouter();
  const { data: attendMeetingList, isLoading: isFetchAttendMeetingLoading } = useQuery(
    ['fetchMeetingList', 'all'],
    fetchMeetingListOfUserAttend
  );

  const { data: me } = useQueryMyProfile();
  const exitModal = useModal();
  const submitModal = useModal();
  const platform = window.innerWidth > 768 ? 'PC' : 'MO';

  const formMethods = useForm<FormCreateType>({
    mode: 'onChange',
    resolver: zodResolver(feedCreateSchema),
  });

  const { isValid } = formMethods.formState;
  const meetingType = formMethods.getValues('meetingId')
    ? attendMeetingList?.data.filter(item => item.id == formMethods.getValues('meetingId'))[0].category
    : '';

  const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
  let basePath = '';
  const { mutate: mutatePostPostWithMention } = useMutationPostPostWithMention({});

  if (hostname === 'localhost' || hostname.includes('dev')) {
    basePath = 'https://sopt-internal-dev.pages.dev';
  } else {
    basePath = 'https://playground.sopt.org';
  }

  const { mutateAsync: mutateCreateFeed, isLoading: isSubmitting } = useMutation({
    mutationFn: (formData: FormCreateType) => createPost(formData),
    onSuccess: res => {
      queryClient.invalidateQueries(['getPosts']);
      alert('피드를 작성했습니다.');
      mutatePostPostWithMention({
        postId: res.postId,
        orgIds: parseMentionedUserIds(formMethods.getValues().contents),
        content: formMethods.getValues().contents,
      });
      submitModal.handleModalClose();
      handleModalClose();
      open({
        icon: 'success',
        content: `${meetingType}에서 새로 배웠거나 좋았던 점을 SOPT 회원들에게 공유해보세요.`,
        action: {
          name: '공유하러 가기',
          onClick: () => {
            ampli.clickFeedShard();
            router.push(`${basePath}/feed/upload`);
          },
        },
      });
    },
    onError: () => alert('피드 작성에 실패했습니다.'),
  });

  const handleDeleteImage = (index: number) => {
    const images = formMethods.getValues().images.slice();
    images.splice(index, 1);
    formMethods.setValue('images', images);
  };

  const handleSubmitClick: SubmitHandler<FormCreateType> = () => {
    submitModal.handleModalOpen();
  };

  const onSubmit = useThrottle(async () => {
    const createFeedParameter = { ...formMethods.getValues() };
    await mutateCreateFeed(createFeedParameter);
    ampli.completedFeedPosting({ user_id: Number(me?.orgId), platform_type: platform, feed_upload: formatDate() });
  }, 5000);

  useEffect(() => {}, [formMethods, isModalOpened]);

  useEffect(() => {
    return () => {
      ampli.completedFeedPostingCanceled({ user_id: Number(me?.orgId), platform_type: platform });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ModalContainer isModalOpened={isModalOpened} handleModalClose={exitModal.handleModalOpen}>
      <SDialogWrapper>
        <FormProvider {...formMethods}>
          {!isFetchAttendMeetingLoading && (
            <FeedFormPresentation
              userId={Number(me?.orgId)}
              attendGroupsInfo={attendMeetingList?.data}
              title="피드 작성"
              handleDeleteImage={handleDeleteImage}
              handleModalClose={handleModalClose}
              setMeetingInfo={meetingInfo =>
                formMethods.setValue('meetingId', meetingInfo?.id as number, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                })
              }
              onSubmit={formMethods.handleSubmit(handleSubmitClick)}
              disabled={isSubmitting || !isValid}
            />
          )}
        </FormProvider>
      </SDialogWrapper>
      <ConfirmModal
        isModalOpened={exitModal.isModalOpened}
        message={`피드 작성을 그만두시겠어요?\n지금까지 쓴 내용이 지워져요.`}
        handleModalClose={exitModal.handleModalClose}
        cancelButton="돌아가기"
        confirmButton="그만두기"
        handleConfirm={() => {
          exitModal.handleModalClose();
          handleModalClose();
        }}
      />
      <ConfirmModal
        isModalOpened={submitModal.isModalOpened}
        message="게시글을 작성하시겠습니까?"
        handleModalClose={submitModal.handleModalClose}
        cancelButton="돌아가기"
        confirmButton="확인"
        handleConfirm={onSubmit}
      />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <DevTool control={formMethods.control} />
    </ModalContainer>
  );
}

export default FeedCreateWithSelectMeetingModal;

const SDialogWrapper = styled('div', {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '$2',
  borderRadius: '20px',
  backgroundColor: '$gray700',
  width: '100%',
  maxWidth: '$768',
  boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
  maxHeight: '100vh',
  overflow: 'visible',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '@tablet': {
    width: '100%',
    height: '100%',
    boxShadow: 'none',
    borderRadius: '0',
  },
});
