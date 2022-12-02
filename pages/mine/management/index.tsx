import { Box } from '@components/box/Box';
import ListItem from '@components/page/groupManagement/ListItem';
import { TabList } from '@components/tabList/TabList';
import { styled } from 'stitches.config';
import GroupInformation from '@components/page/groupManagement/GroupInformation';
import Pagination from '@components/page/groupList/Pagination';
import { usePageParams } from '@hooks/queryString/custom';
import Select from '@components/Form/Select';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  applicantOptionList,
  numberOptionList,
  sortOptionList,
} from 'src/data/options';
import {
  useMutationUpdateApplication,
  useQueryGetGroup,
  useQueryGetGroupPeopleList,
} from 'src/api/meeting/hooks';
import { useRouter } from 'next/router';
import { Option } from '@components/Form/Select/OptionItem';
import { UpdateApplicationRequest } from 'src/api/meeting';
import InvitationIcon from 'public/assets/svg/invitation.svg';

const ManagementPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { value: page, setValue: setPage } = usePageParams();

  const { isLoading: isGroupDataLoading, data: groupData } = useQueryGetGroup({
    params: { id },
  });
  const isHost = groupData?.host ?? false;

  const [selectedNumber, setSelectedNumber] = useState<Option>(
    numberOptionList[0]
  );
  const [selectedApplicant, setSelectedApplicant] = useState<Option>(
    applicantOptionList[0]
  );
  const [selectedSort, setSelectedSort] = useState<Option>(sortOptionList[0]);
  const {
    isLoading: isManagementDataLoading,
    data: management,
    refetch,
  } = useQueryGetGroupPeopleList({
    params: {
      id,
      page: (page || 0) as number,
      take: Number(selectedNumber.value),
      status: Number(selectedApplicant.value) - 1,
      date: selectedSort.value as string,
    },
  });

  const { mutate: mutateUpdateApplication } = useMutationUpdateApplication({});
  const handleChangeApplicationStatus = (
    request: Omit<UpdateApplicationRequest, 'id'>
  ) => {
    mutateUpdateApplication(
      { id: Number(id), ...request },
      {
        onSuccess: () => {
          // TODO
        },
      }
    );
  };

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [refetch, id, selectedNumber, selectedApplicant, selectedSort]);

  if (isGroupDataLoading || isManagementDataLoading) {
    return <div>loading...</div>;
  }

  return (
    <SManagementPage>
      <TabList text="mine" size="big" onChange={() => {}}>
        <Link href="/" passHref>
          <a>
            <TabList.Item text="all">전체 모임</TabList.Item>
          </a>
        </Link>
        <Link href="/mine" passHref>
          <a>
            <TabList.Item text="mine">내 모임</TabList.Item>
          </a>
        </Link>
      </TabList>
      {groupData && <GroupInformation groupData={groupData} />}
      <SListHeader>
        <SListTitle>
          모임 {isHost ? '신청자' : '참여자'}
          {management && <span> ({management.meta.itemCount})</span>}
        </SListTitle>
        {isHost ? (
          <SInvitationButton>
            <InvitationIcon />
            초대하기
          </SInvitationButton>
        ) : (
          <SSelectWrapper>
            <Select
              value={selectedNumber}
              options={numberOptionList}
              onChange={value => setSelectedNumber(value)}
            />
          </SSelectWrapper>
        )}
      </SListHeader>
      {isHost && (
        <>
          <SSelectContainer>
            <SSelectWrapper>
              <Select
                value={selectedNumber}
                options={numberOptionList}
                onChange={value => setSelectedNumber(value)}
              />
            </SSelectWrapper>
            <div>
              <SSelectWrapper>
                <Select
                  value={selectedApplicant}
                  options={applicantOptionList}
                  onChange={value => setSelectedApplicant(value)}
                />
              </SSelectWrapper>
              <SSelectWrapper>
                <Select
                  value={selectedSort}
                  options={sortOptionList}
                  onChange={value => setSelectedSort(value)}
                />
              </SSelectWrapper>
            </div>
          </SSelectContainer>
          <SDescriptionBox>
            <div>
              <SType>유형</SType>
              <SProfile>프로필 (상태)</SProfile>
              <SDetail>상세 내역</SDetail>
              <span>신청 일자</span>
            </div>
            <span>관리</span>
          </SDescriptionBox>
        </>
      )}
      {management && management.apply?.length > 0 ? (
        management?.apply.map(application => (
          <ListItem
            key={id}
            application={application}
            isHost={isHost}
            onChangeApplicationStatus={handleChangeApplicationStatus}
          />
        ))
      ) : (
        <SEmptyView>{isHost ? '신청자' : '참여자'}가 없습니다.</SEmptyView>
      )}
      {management && management.meta?.pageCount > 0 && (
        <SPaginationWrapper>
          <Pagination
            totalPagesLength={management?.meta?.pageCount}
            currentPageIndex={Number(page)}
            changeCurrentPage={setPage}
          />
        </SPaginationWrapper>
      )}
    </SManagementPage>
  );
};

export default ManagementPage;

const SManagementPage = styled(Box, {
  mt: '$100',
  mb: '$180',
});

const SListHeader = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  mt: '$64',
  mb: '$48',
  position: 'relative',
});

const SListTitle = styled(Box, {
  fontAg: '32_bold_100',
});

const SInvitationButton = styled('button', {
  color: '$white',
  fontAg: '18_bold_100',
  border: '1px solid $white',
  borderRadius: '14px',
  padding: '$18 $24 $18 $20',
  flexType: 'verticalCenter',

  '& > svg': {
    mr: '$12',
  },
});

const SSelectContainer = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  mb: '$36',
  position: 'relative',

  '& > div': {
    flexType: 'verticalCenter',
    gap: '$12',
  },
});

const SDescriptionBox = styled(Box, {
  border: '1px solid $black40',
  borderRadius: '15px',
  padding: '$19 $82 $19 $35',
  mb: '$28',
  flexType: 'verticalCenter',
  justifyContent: 'space-between',

  '& span': {
    color: '$gray80',
    fontAg: '16_bold_100',
  },
});

const SType = styled('span', {
  mr: '$68',
});

const SProfile = styled('span', {
  mr: '$84',
});

const SDetail = styled('span', {
  mr: '$70',
});

const SSelectWrapper = styled(Box, {
  '& button': {
    border: '1px solid $black40',
    backgroundColor: '$black100',
  },

  '& ul': {
    background: '$black100',
    position: 'absolute',
    top: '$50',
    minWidth: '$147',
  },

  '& div': {
    background: '$black100',
  },
});

const SEmptyView = styled(Box, {
  flexType: 'center',
  height: '$820',
  borderRadius: '10px',
  border: `1px solid $black40`,
  fontAg: '24_medium_100',
  color: '$gray80',
});

const SPaginationWrapper = styled(Box, {
  mt: '$80',
});
