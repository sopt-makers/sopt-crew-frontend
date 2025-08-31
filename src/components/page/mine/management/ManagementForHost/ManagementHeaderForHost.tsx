import { components } from '@/__generated__/schema2';
import { useDownloadMeetingMemberCSVMutation } from '@api/meeting/mutation';
import DownloadIcon from '@assets/svg/download.svg';
import { styled } from 'stitches.config';

type ManagementHeaderForHostProps = {
  id: string;
  isMeetingDataLoading: boolean;
  management?: {
    apply: components['schemas']['ApplyInfoDetailDto'][];
    meta: components['schemas']['PageMetaDto'];
  };
};

const ManagementHeaderForHost = ({ id, isMeetingDataLoading, management }: ManagementHeaderForHostProps) => {
  const { mutate: downloadCSVMutate, isPending: isDownloadCSVLoading } = useDownloadMeetingMemberCSVMutation();

  const handleCSVDownload = () => {
    downloadCSVMutate(id);
  };

  return (
    <>
      <SListTitle>
        {!isMeetingDataLoading && <span>모임 참여자</span>}
        {management && <span> ({management.meta.itemCount})</span>}
      </SListTitle>
      <SDownloadButton onClick={handleCSVDownload} disabled={isDownloadCSVLoading}>
        <DownloadIcon />
        <span>CSV 다운로드</span>
      </SDownloadButton>
    </>
  );
};

export default ManagementHeaderForHost;

const SListTitle = styled('div', {
  fontAg: '32_bold_100',

  '@mobile': {
    fontAg: '18_bold_100',
  },
});

const SDownloadButton = styled('button', {
  color: '$gray10',
  fontAg: '18_bold_100',
  border: '1px solid $gray10',
  borderRadius: '14px',
  padding: '$18 $24 $18 $20',
  flexType: 'verticalCenter',

  '& > svg': {
    mr: '$12',
  },

  '@mobile': {
    border: 'none',
    padding: '$0',

    span: {
      display: 'none',
    },

    svg: {
      mr: '$0',
    },
  },
});
