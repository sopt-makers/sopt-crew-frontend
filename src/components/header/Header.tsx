import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { styled } from 'stitches.config';
import { Box } from '@components/box/Box';
import { useGetMemberOfMe } from '@api/members/hooks';
import { DesktopHeader, MobileHeader, playgroundLink } from '@sopt-makers/playground-common';
import { ACCESS_TOKEN_KEY } from '@components/util/auth';

// TODO: playground 팀에서 type export하면 제거할 예정
type LinkRendererParams = {
  href: string;
  children: ReactNode;
};

const Header: FC = () => {
  const { data: me } = useGetMemberOfMe();
  const user = me ? { id: `${me.id}`, name: me.name, image: me.profileImage ?? undefined } : null;

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.location.href = `${playgroundLink.login()}`;
  };

  const renderLink = ({ href, children }: LinkRendererParams) => {
    if (href.startsWith(playgroundLink.groupList())) {
      return (
        <Link href="/" passHref>
          <a>{children}</a>
        </Link>
      );
    }
    return <a href={href}>{children}</a>;
  };

  const activePathMatcher = (href: string) => {
    return href === playgroundLink.groupList();
  };

  return (
    <>
      <SDesktopHeaderWrapper>
        <DesktopHeader user={user} onLogout={logout} renderLink={renderLink} activePathMatcher={activePathMatcher} />
      </SDesktopHeaderWrapper>
      <SMobileHeaderWrapper>
        <MobileHeader user={user} onLogout={logout} renderLink={renderLink} activePathMatcher={activePathMatcher} />
      </SMobileHeaderWrapper>
    </>
  );
};

export default Header;

const HeaderWrapper = styled(Box, {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: '$1',

  '& > header': {
    backgroundColor: '$black100',
  },
});

const SDesktopHeaderWrapper = styled(HeaderWrapper, {
  display: 'block',

  '@mobile': {
    display: 'none',
  },
});

const SMobileHeaderWrapper = styled(HeaderWrapper, {
  display: 'none',

  img: {
    width: '100%',
  },

  '@mobile': {
    display: 'block',
  },
});
