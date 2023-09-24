import { paths } from '@/__generated__/schema';
import { apiV2 } from '@api/index';
import FeedPostViewer from '@components/feed/FeedPostViewer/FeedPostViewer';
import Loader from '@components/loader/Loader';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export default function PostPage() {
  const { query } = useRouter();
  const { GET } = apiV2.get();
  const data = useQuery({
    queryFn: () => GET('/post/v1/{postId}', { params: { path: { postId: Number(query.id as string) } } }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    select: res => res.data.data,
    enabled: !!query.id,
  });

  // TODO: 자동으로 타입 추론 되게끔 endpoint 수정 필요
  const post = data.data as paths['/post/v1/{postId}']['get']['responses']['200']['content']['application/json'];

  // TODO: loading 스켈레톤 UI가 있으면 좋을 듯
  if (!post) return <Loader />;

  return (
    <div>
      <FeedPostViewer post={post} Actions={['수정', '삭제']} />
    </div>
  );
}
