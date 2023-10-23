import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { styled } from 'stitches.config';
import { DesktopHeader, MobileHeader, playgroundLink } from '@sopt-makers/playground-common';
import { ACCESS_TOKEN_KEY } from '@components/util/auth';
import { useQueryMyProfile } from '@api/user/hooks';

// TODO: playground 팀에서 type export하면 제거할 예정
type LinkRendererParams = {
  href: string;
  children: ReactNode;
};

const Header: FC = () => {
  const { data: me } = useQueryMyProfile();
  const user = me ? { id: `${me.orgId}`, name: me.name, image: me.profileImage ?? undefined } : null;

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

const HeaderWrapper = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: '$1',

  '& > header': {
    backgroundColor: '$gray950',
  },
});

const SDesktopHeaderWrapper = styled(HeaderWrapper, {
  display: 'block',

  '@tablet': {
    display: 'none',
  },
});

const SMobileHeaderWrapper = styled(HeaderWrapper, {
  display: 'none',

  img: {
    width: '100%',
  },

  '@tablet': {
    display: 'block',
  },
});
