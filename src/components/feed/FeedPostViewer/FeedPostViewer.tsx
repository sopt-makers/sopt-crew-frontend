import { paths } from '@/__generated__/schema';
import { Menu } from '@headlessui/react';
import Avatar from '@components/avatar/Avatar';
import MenuIcon from 'public/assets/svg/ic_menu.svg';
import CommentIcon from 'public/assets/svg/comment.svg';
import LikeIcon from 'public/assets/svg/like.svg';
import LikeFillIcon from 'public/assets/svg/like_fill.svg';

interface FeedPostViewerProps {
  post: paths['/post/v1/{postId}']['get']['responses']['200']['content']['application/json'];
  Actions: React.ReactNode[];
}

export default function FeedPostViewer({ post, Actions }: FeedPostViewerProps) {
  return (
    <section>
      <div>
        <div>
          <div>
            <Avatar src={post.user.profileImage || ''} alt={post.user.name} />
            <div>
              <span>{post.user.name}</span>
              <span>{post.updatedDate}</span>
            </div>
          </div>
          <Menu>
            <Menu.Button>
              <MenuIcon />
            </Menu.Button>
            <Menu.Items>
              {Actions.map(Action => (
                <Menu.Item>{Action}</Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
        <h2>{post.title}</h2>
        <p>{post.contents}</p>
        <span>{post.viewCount}</span>
      </div>

      <div>
        <div>
          <CommentIcon />
          {/* TODO: add comment count */}
          <span>댓글 </span>
        </div>
        <div>
          {post.isLiked ? <LikeFillIcon /> : <LikeIcon />}
          <span>좋아요 {post.likeCount}</span>
        </div>
      </div>
    </section>
  );
}
