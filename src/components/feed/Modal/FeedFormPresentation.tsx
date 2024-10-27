import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@type/form';
import { styled } from 'stitches.config';

import { ampli } from '@/ampli';
import { getPresignedUrl, uploadImage } from '@api/API_LEGACY/meeting';
import CameraIcon from '@assets/svg/camera.svg';
import CancelIcon from '@assets/svg/x_big_gray.svg';
import FormController from '@components/form/FormController';
import { Divider } from '@components/util/Divider';
import { FORM_TITLE_MAX_LENGTH } from '@constants/feed';
import { imageS3Bucket } from '@constants/url';
import { useToast } from '@sopt-makers/ui';
import { getResizedImage } from '@utils/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import ImagePreview from './ImagePreview';
import SelectMeeting from './SelectMeeting';
import { ERROR_MESSAGE } from './feedSchema';
import CommonMention from '../Mention';

export interface GroupInfo {
  id?: number;
  title: string;
  imageUrl: string;
  category: string;
  contents?: string;
}

interface PresentationProps {
  userId?: number;
  groupInfo?: GroupInfo;
  attendGroupsInfo?: GroupInfo[];
  title: string;
  handleModalClose: () => void;
  handleDeleteImage: (index: number) => void;
  setMeetingInfo?: (meeting: GroupInfo) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  disabled: boolean;
}
interface FileChangeHandler {
  imageUrls: string[];
  onChange: (urls: string[]) => void;
}

function FeedFormPresentation({
  userId,
  groupInfo,
  attendGroupsInfo = [],
  title,
  handleModalClose,
  handleDeleteImage,
  setMeetingInfo,
  onSubmit,
  disabled = true,
}: PresentationProps) {
  const { open } = useToast();

  // textarea의 높이를 화면의 남은 부분으로 가져가기 위한 로직
  const [textareaHeightChangeFlag, setTextareaHeightChangeFlag] = useState(false);
  const textAreaRef = useRef(null);
  const [remainingHeight, setRemainingHeight] = useState(100);
  const [selectedMeeting, setSelectedMeeting] = useState<GroupInfo | undefined>(undefined);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const userAgent = navigator.userAgent;

  if (/android/i.test(userAgent) || /iPad|iPhone|iPod/.test(userAgent)) {
    setIsMobileDevice(true);
  }

  const handleWindowResize = () => {
    setTextareaHeightChangeFlag(flag => !flag);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    const BasicPadding = 90;
    if (textAreaRef.current) {
      const allComponentHeights = Array.from(document.querySelectorAll('.calc_target')).reduce(
        (totalHeight, component) => {
          const computedStyle = window.getComputedStyle(component);
          const marginTop = parseInt(computedStyle.marginTop, 10) || 0;
          const marginBottom = parseInt(computedStyle.marginBottom, 10) || 0;
          return totalHeight + component.clientHeight + marginTop + marginBottom;
        },
        0
      );

      const availableHeight = window.innerHeight - allComponentHeights - BasicPadding;
      setRemainingHeight(isMobileDevice ? availableHeight - 44 : availableHeight);
    }
  }, [textareaHeightChangeFlag]);

  const onDeleteFile = (index: number) => () => {
    handleDeleteImage(index);
    setTextareaHeightChangeFlag(flag => !flag);
  };

  const handleAddFiles =
    ({ imageUrls, onChange }: FileChangeHandler) =>
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      const newFiles = Array.from(e.target.files);
      if (newFiles.some(file => file.size > MAX_FILE_SIZE)) {
        alert('5MB 이하의 사진만 업로드할 수 있습니다.');
        return;
      }
      const filesCount = imageUrls.length + newFiles.length;
      if (filesCount > 10) {
        alert('이미지는 최대 10개까지 업로드 가능합니다.');
        return;
      } else {
        const urls = await Promise.all(newFiles.map(async file => await uploadFile(file)));
        onChange([...imageUrls, ...urls]);
      }
      setTextareaHeightChangeFlag(flag => !flag);
      ampli.attachFeedPhoto({ user_id: userId, platform_type: window.innerWidth > 768 ? 'PC' : 'MO' });
    };

  const uploadFile = async (file: File) => {
    const extension = file.type.split('/')[1];
    const { url, fields } = await getPresignedUrl(extension);
    await uploadImage(file, url, fields);
    const imageUrls = imageS3Bucket + fields.key;
    return imageUrls;
  };

  const handleSelectMeeting = (meeting: GroupInfo) => {
    setSelectedMeeting(meeting);
    setMeetingInfo?.(meeting);
  };

  return (
    <SFormContainer>
      <form onSubmit={onSubmit}>
        <SFormHeader className="calc_target">
          <SCancelIcon onClick={handleModalClose} />
          <SFormName>{title}</SFormName>
          <SSubmitButton type="submit" disabled={disabled}>
            완료
          </SSubmitButton>
        </SFormHeader>
        <div className="calc_target">
          {attendGroupsInfo?.length === 0 && groupInfo ? (
            <SGroupInfoSection>
              <SThumbnailImage
                css={{
                  backgroundImage: `url(${getResizedImage(groupInfo.imageUrl, 168)})`,
                }}
              />
              <SCategory>{groupInfo.category}</SCategory>
              <STitle>{groupInfo.title}</STitle>
            </SGroupInfoSection>
          ) : (
            <SelectMeeting
              selectMeetingInfo={selectedMeeting}
              meetingList={attendGroupsInfo}
              onClick={handleSelectMeeting}
            />
          )}
        </div>

        <SDivider className="calc_target" />
        <FormController
          name="title"
          defaultValue=""
          render={({ field: { value: titleValue, onChange, onBlur } }) => (
            <STitleInput
              className="calc_target"
              type="text"
              placeholder="제목을 입력해 주세요. (최대 100자)"
              value={titleValue}
              onChange={e => {
                const inputValue = e.target.value;
                if (inputValue.length <= FORM_TITLE_MAX_LENGTH) {
                  onChange(inputValue);
                } else {
                  onChange(inputValue.substring(0, FORM_TITLE_MAX_LENGTH));
                  open({
                    icon: 'error',
                    content: ERROR_MESSAGE.TITLE.MAX,
                  });
                }
              }}
              onBlur={onBlur}
            />
          )}
        />
        <SDivider className="calc_target" />
        <FormController
          name="contents"
          defaultValue=""
          render={({ field: { value: contentsValue, onChange } }) => (
            <SFeedContentTextArea
              css={{
                '@tablet': {
                  height: `${remainingHeight}px`,
                },
              }}
            >
              <CommonMention
                inputRef={textAreaRef}
                value={contentsValue}
                setValue={onChange}
                placeholder={'모임에서 있었던 일들을 친구들에게 공유해 주세요!'}
                setIsFocused={() => {}}
                setUserIds={() => {}}
                isComment={false}
              ></CommonMention>
            </SFeedContentTextArea>
          )}
        />
        <SDivider className="calc_target" />
        <FormController
          name="images"
          defaultValue={[]}
          render={({ field: { value: imageUrls, onChange, onBlur } }) => (
            <>
              {!!(imageUrls as string[]).length && (
                <>
                  <SImageListWrapper className="calc_target">
                    {(imageUrls as string[]).map((url, idx) => (
                      <SImagePreviewHolder key={`${url}-${idx}`}>
                        <ImagePreview url={url} onDelete={onDeleteFile(idx)} />
                      </SImagePreviewHolder>
                    ))}
                  </SImageListWrapper>
                  <SImageListDivider className="calc_target" />
                </>
              )}

              <SImageInputWrapper className="calc_target">
                <SFileInputWrapper>
                  <SFileInput
                    type="file"
                    multiple
                    accept={ACCEPTED_IMAGE_TYPES.join(', ')}
                    onChange={handleAddFiles({ imageUrls, onChange })}
                    onBlur={onBlur}
                  />
                  <CameraIcon />
                </SFileInputWrapper>
                <SImageCount>{(imageUrls as string[]).length} / 10</SImageCount>
              </SImageInputWrapper>
            </>
          )}
        />
      </form>
    </SFormContainer>
  );
}

export default FeedFormPresentation;

const SFormContainer = styled('div', {
  width: '100%',
  padding: '40px 30px 30px',
  background: '$gray800',
  borderRadius: '15px',
  '@tablet': {
    padding: '30px 0 0 0',
    background: '$gray950',
    height: '100vh',
    borderRadius: '0',
  },
});
const SFormName = styled('h1', {
  fontStyle: 'H1',
  color: '$gray10',

  '@tablet': {
    margin: 0,
    fontStyle: 'T3',
  },
});

const SFormHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@tablet': {
    px: '$20',
  },
});

const SCancelIcon = styled(CancelIcon, {
  cursor: 'pointer',
});

const SSubmitButton = styled('button', {
  fontStyle: 'T1',
  color: '$gray10',
  variants: {
    disabled: {
      true: {
        color: '$gray500',
        cursor: 'not-allowed',
      },
    },
  },
  '@tablet': {
    fontStyle: 'T4',
  },
});

const SGroupInfoSection = styled('div', {
  mt: '$40',
  flexType: 'verticalCenter',
  '@tablet': {
    px: '$20',
  },
});

const SThumbnailImage = styled('div', {
  width: '56px',
  height: '56px',
  borderRadius: '$6',
  overflow: 'hidden',
  backgroundColor: '$gray800',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  '@tablet': {
    width: '40px',
    height: '40px',
  },
});

const SCategory = styled('p', {
  color: '$gray400',
  fontStyle: 'T3',
  ml: '$20',
  '@tablet': {
    fontStyle: 'T4',
    ml: '$12',
  },
});

const STitle = styled('p', {
  maxWidth: '70%',
  color: '$white',
  fontStyle: 'T3',
  ml: '$8',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',

  '@tablet': {
    fontStyle: 'T4',
  },
});

const SDivider = styled(Divider, {
  my: '$24',
  backgroundColor: '$gray600',
  '@tablet': {
    my: '$20',
  },
});

const STitleInput = styled('input', {
  width: '100%',
  color: '$white',
  fontStyle: 'H3',
  ml: '$8',

  '@tablet': {
    px: '$20',
    boxSizing: 'border-box',
    fontStyle: 'H4',
  },
});

const SFeedContentTextArea = styled('div', {
  width: '100%',
  height: '208px',
  border: 'none',
  resize: 'none',
  fontStyle: 'B2',
  color: '$white',
  backgroundColor: 'inherit',
  ml: '$8',

  '@tablet': {
    px: '$20',
    boxSizing: 'border-box',
  },

  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const SImagePreviewHolder = styled('div', {
  width: '108px',
  height: '108px',
  mb: '$24',
  mr: '$12',
  '@tablet': {
    width: '84px',
    height: '84px',
  },
});

const SFileInputWrapper = styled('label', {
  position: 'relative',
  cursor: 'pointer',
});

const SFileInput = styled('input', {
  position: 'absolute',
  margin: '-1px',
  width: '1px',
  height: '1px',
  padding: 0,
  border: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
});

const SImageCount = styled('p', {
  color: '$gray300',
  fontStyle: 'B1',
});

const SImageInputWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '@tablet': {
    px: '$16',
  },
});

const SImageListWrapper = styled('div', {
  display: 'flex',
  overflowX: 'scroll',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  '& > div:first-child': {
    ml: '$16',
  },
  '& > div:last-child': {
    mr: '$16',
  },
});

const SImageListDivider = styled(Divider, {
  mt: '$0',
  mb: '$24',
  backgroundColor: '$gray600',
});
