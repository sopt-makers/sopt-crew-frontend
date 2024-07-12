import { useRef, useState, useCallback } from 'react';
import { styled, keyframes } from 'stitches.config';
import { MentionsInput, Mention, SuggestionDataItem } from 'react-mentions';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import DefaultProfile from 'public/assets/svg/mention_profile_default.svg';
import { useQueryGetMentionUsers } from '@api/user/hooks';
import { PostCommentWithMentionRequest } from '@api/mention';

interface FeedCommentEditorProps {
  defaultValue: string;
  onCancel: () => void;
  onSubmit: (req: PostCommentWithMentionRequest) => Promise<void>;
}

interface mentionableDataType {
  id: number;
  display: string;
  userId: number;
  userName: string;
  recentPart: string;
  recentGeneration: number;
  profileImageUrl: string;
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
      userIds: userIds,
      content: comment,
    });
  };
  const extractNumbers = (inputString: string) => {
    const regex = /-~!@#@[^[\]]+\[(\d+)\]%\^&\*\+/g;
    const numbers: number[] | null = [];
    let match;

    while ((match = regex.exec(inputString)) !== null) {
      numbers.push(Number(match[1]));
    }
    setUserIds(numbers);
  };

  const { data: mentionUserList } = useQueryGetMentionUsers();

  const filterUsersBySearchTerm = (searchTerm: string, users: mentionableDataType[]) => {
    return users.filter((v: mentionableDataType) => v.userName.includes(searchTerm));
  };

  const getRandomUsers = (users: mentionableDataType[]) => {
    const shuffled = users.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 30);
  };

  const getFilteredAndRandomUsers = (searchTerm: string, users: mentionableDataType[]) => {
    const filteredUsers = filterUsersBySearchTerm(searchTerm, users);
    const randomUsers = getRandomUsers(filteredUsers);
    return randomUsers;
  };

  const renderSuggestion = useCallback(
    (suggestion: SuggestionDataItem) => {
      return (
        <>
          <SrenderSuggestion key={suggestion.id}>
            {(suggestion as mentionableDataType).profileImageUrl ? (
              <SImageWrapper>
                <img src={(suggestion as mentionableDataType).profileImageUrl} alt="Img" />
              </SImageWrapper>
            ) : (
              <DefaultProfile />
            )}
            <div>
              <div>{suggestion.display}</div>{' '}
              <p>
                {(suggestion as mentionableDataType).recentGeneration}기{` `}
                {(suggestion as mentionableDataType).recentPart}
              </p>
            </div>
          </SrenderSuggestion>
        </>
      );
    },
    [
      /*data*/
    ]
  );
  const customSuggestionsContainer = (children: React.ReactNode) => {
    return <ScustomSuggestionsContainer>{children}</ScustomSuggestionsContainer>;
  };
  return (
    <EditorContainer>
      <Editor>
        <MentionsInput
          inputRef={editorRef}
          defaultValue={defaultValue}
          value={comment}
          onChange={(e, newValue, mentions) => {
            // 비밀 문자열이 포함된 input text 가 newValue 입니다.
            extractNumbers(newValue);
            // mentionIds 배열에는 mentions 배열의 id 를 활용하면 좋을 것 같습니다.

            if (!editorRef.current) {
              setComment(e.target.value);
              return;
            }
            if (e.target.value.length === 0) {
              editorRef.current.style.height = 'auto';
            } else {
              editorRef.current.style.height = `${editorRef.current.scrollHeight}px`;
            }
            setComment(e.target.value);
          }}
          customSuggestionsContainer={customSuggestionsContainer}
          style={{
            control: {
              fontWeight: 'normal',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              lineHeight: 'inherit',
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
            },
            '&multiLine': {
              input: {
                color: colors.gray50,
                border: 'none',
                padding: '0',
                fontWeight: 'normal',
                margin: '0',
                boxSizing: 'border-box',
                overflow: 'auto',
                width: '100%',
                possition: 'relative',
                maxHeight: '120px',
                overscrollBehavior: 'none',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                lineHeight: 'inherit',
              },
              highlighter: {
                color: colors.success,
                innerHeight: '0',
                border: 'none',
                padding: '0',
                margin: '0',
                overflow: 'auto',
                boxSizing: 'border-box',
                maxHeight: '120px',
                pointerEvents: 'none',
                width: '100%',
                zIndex: '1',
              },
            },
            suggestions: {
              backgroundColor: 'transparent',
              item: {
                borderRadius: '8px',
                '&focused': {
                  background: colors.gray800,
                },
              },
            },
          }}
        >
          <Mention
            trigger="@"
            displayTransform={(_, display) => `@${display}`}
            data={search => {
              const data = getFilteredAndRandomUsers(
                search,
                mentionUserList?.map((v: mentionableDataType) => ({ ...v, id: v.userId, display: v.userName }))
              );
              return data;
            }}
            markup="-~!@#@__display__[__id__]%^&*+" // markup 의 display와 id 앞 뒤에 __ 가 있는 이유는, string 에서 js 변수를 찾아내기 위한 라이브러리 rule 입니다.
            renderSuggestion={renderSuggestion}
          />
        </MentionsInput>
      </Editor>
      <ButtonWrapper>
        <CancelButton onClick={onCancel}>취소</CancelButton>
        <SubmitButton onClick={handleSubmit}>수정</SubmitButton>
      </ButtonWrapper>
    </EditorContainer>
  );
}

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(0)' },
  '100%': { opacity: 1, transform: 'translateY(10px)' },
});

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
const SImageWrapper = styled('div', {
  img: {
    objectFit: 'cover',
    width: '32px',
    height: '32px',
    borderRadius: '100%',
  },
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
const SrenderSuggestion = styled('button', {
  boxSizing: 'border-box',
  padding: '8px 12px',
  gap: '12px',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '8px',
  marginBottom: '6px',
  ...fontsObject.BODY_2_16_M,
  color: colors.gray10,
  '& > div > p': {
    ...fontsObject.BODY_4_13_R,
    color: colors.gray100,
  },
  '@tablet': {
    padding: '16px 12px',
  },
});

const ScustomSuggestionsContainer = styled('div', {
  borderRadius: '13px',
  boxSizing: 'border-box',
  width: 'max-content',
  padding: '8px',
  background: '#17181c',
  border: `1px solid ${colors.gray700}`,

  animation: `${fadeIn} 0.5s forwards`,

  maxHeight: '418px',
  overflow: 'scroll',

  '@tablet': {
    position: 'fixed',
    left: '0',
    bottom: '120px',
    width: '100%',
    maxHeight: '418px',
    height: '100%',
    border: 'none',
    borderRadius: '20px',
  },
});
