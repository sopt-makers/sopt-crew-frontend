import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { styled } from 'stitches.config';
import { Box } from '@components/box/Box';
import { TabList } from '@components/tabList/TabList';
import ManagementListSkeleton from '@components/page/groupManagement/ManagementListSkeleton';
import GroupInformationSkeleton from '@components/page/groupManagement/GroupInformationSkeleton';
import ManagementListItem from '@components/page/groupManagement/ManagementListItem';
import GroupInformation from '@components/page/groupManagement/GroupInformation';
import Select from '@components/Form/Select';
import { Option } from '@components/Form/Select/OptionItem';
import ItemDescriptionBox from '@components/page/groupManagement/ItemDescriptionBox';
import Pagination from '@components/page/groupList/Pagination';
import { usePageParams } from '@hooks/queryString/custom';
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
import { UpdateApplicationRequest } from 'src/api/meeting';
import InvitationIcon from 'public/assets/svg/invitation.svg';
import useModal from '@hooks/useModal';
import InvitationModal from '@components/page/groupManagement/InvitationModal';

const ManagementPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { isModalOpened, handleModalOpen, handleModalClose } = useModal();
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

  return (
    <SManagementPage>
      <TabList text="mine" size="big" onChange={() => {}}>
        <Link href="/" passHref>
          <a>
            <TabList.Item text="all">?????? ??????</TabList.Item>
          </a>
        </Link>
        <Link href="/mine" passHref>
          <a>
            <TabList.Item text="mine">??? ??????</TabList.Item>
          </a>
        </Link>
      </TabList>
      {isGroupDataLoading ? (
        <GroupInformationSkeleton />
      ) : (
        groupData && <GroupInformation groupData={groupData} />
      )}
      {isManagementDataLoading ? (
        <ManagementListSkeleton />
      ) : (
        <>
          <SListHeader>
            <SListTitle>
              ?????? {isHost ? '?????????' : '?????????'}
              {management && <span> ({management.meta.itemCount})</span>}
            </SListTitle>
            {isHost ? (
              <SInvitationButton onClick={handleModalOpen}>
                <InvitationIcon />
                <span>????????????</span>
              </SInvitationButton>
            ) : (
              <SSelectNumberWrapper>
                <Select
                  value={selectedNumber}
                  options={numberOptionList}
                  onChange={value => setSelectedNumber(value)}
                />
              </SSelectNumberWrapper>
            )}
          </SListHeader>
          {isHost && (
            <>
              <SSelectContainer>
                <SSelectWrapper>
                  <Select
                    value={selectedApplicant}
                    options={applicantOptionList}
                    onChange={value => setSelectedApplicant(value)}
                  />
                </SSelectWrapper>
                <div>
                  <SSelectNumberWrapper>
                    <Select
                      value={selectedNumber}
                      options={numberOptionList}
                      onChange={value => setSelectedNumber(value)}
                    />
                  </SSelectNumberWrapper>
                  <SSelectWrapper>
                    <Select
                      value={selectedSort}
                      options={sortOptionList}
                      onChange={value => setSelectedSort(value)}
                    />
                  </SSelectWrapper>
                </div>
              </SSelectContainer>
              <ItemDescriptionBox />
            </>
          )}
          {management && management.apply?.length > 0 ? (
            management?.apply.map(application => (
              <ManagementListItem
                key={id}
                application={application}
                isHost={isHost}
                onChangeApplicationStatus={handleChangeApplicationStatus}
              />
            ))
          ) : (
            <SEmptyView>{isHost ? '?????????' : '?????????'}??? ????????????.</SEmptyView>
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
          {isModalOpened && (
            <InvitationModal
              isModalOpened={isModalOpened}
              title="????????????"
              handleModalClose={handleModalClose}
            />
          )}
        </>
      )}
    </SManagementPage>
  );
};

export default ManagementPage;

const SManagementPage = styled(Box, {
  mt: '$100',
  mb: '$180',

  '@mobile': {
    mt: '$31',
    mb: '$66',
  },
});

const SListHeader = styled(Box, {
  flexType: 'verticalCenter',
  justifyContent: 'space-between',
  mt: '$64',
  mb: '$48',
  position: 'relative',

  '@mobile': {
    mt: '$40',
    mb: '$24',
  },
});

const SListTitle = styled(Box, {
  fontAg: '32_bold_100',

  '@mobile': {
    fontAg: '18_bold_100',
  },
});

const SInvitationButton = styled('button', {
  color: '$white',
  fontAg: '18_bold_100',
  border: '1px solid $white',
  borderRadius: '14px',
  padding: '$18 $24 $18 $20',
  flexType: 'verticalCenter',
  display: 'none',

  '& > svg': {
    mr: '$12',
  },

  '@mobile': {
    border: 'none',
    padding: '$0',
    width: '$24',
    height: '$24',

    svg: {
      mr: '$0',
      transform: 'scale(1.2)',
    },

    span: {
      display: 'none',
    },
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

  '@mobile': {
    mb: '$16',
  },
});

const SSelectWrapper = styled(Box, {
  '& button': {
    borderRadius: '14px',
    border: '1px solid $black20',
    backgroundColor: '$black100',

    '@mobile': {
      borderRadius: '8px',
      minWidth: '$96',
      height: '$36',
      padding: '$12 $10',
      fontAg: '12_semibold_100',
    },
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

const SSelectNumberWrapper = styled(SSelectWrapper, {
  '@mobile': {
    display: 'none',
  },
});

const SEmptyView = styled(Box, {
  flexType: 'center',
  height: '$820',
  borderRadius: '10px',
  border: `1px solid $black40`,
  fontAg: '24_medium_100',
  color: '$gray80',

  '@mobile': {
    fontAg: '16_medium_100',
    height: '$556',
  },
});

const SPaginationWrapper = styled(Box, {
  mt: '$80',

  '@mobile': {
    mt: '$40',
  },
});
