import Link from 'next/link';
import { useRouter } from 'next/router';
import LogoIcon from '@assets/icon/icon-logo.svg?rect';
import MemberIcon from '@assets/icon/icon-member.svg?rect';
import MenuIcon from '@assets/icon/icon-menu.svg?rect';
import ProfileIcon from '@assets/icon/icon-profile.svg?rect';
import { FC, useEffect, useRef, useState } from 'react';

// import useAuth from '@/components/auth/useAuth';

import BackIcon from '@assets/icon/icon-back.svg';

import { styled } from 'stitches.config';
import { Box } from '@components/box/Box';
import { useGetMemberOfMe } from 'src/api/members/hooks';
import { FEEDBACK_FORM_URL } from '@constants/link';
import { usePlaygroundLink } from '@hooks/usePlaygroundLink';

const Header: FC = () => {
  //   const { logout } = useAuth();
  const { pathname, events, basePath } = useRouter();
  const [isUserDropdownOpened, setIsUserDropdownOpened] = useState(false);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const { data: me } = useGetMemberOfMe();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  const playgroundLink = usePlaygroundLink();
  const isGroupPage = basePath === '/group';
  useEffect(() => {
    const closeDropdownHandler = (e: Event) => {
      if (!(e.target instanceof HTMLElement)) {
        return;
      }

      if (
        !dropdownButtonRef.current?.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setIsUserDropdownOpened(false);
      }
      if (
        !mobileButtonRef.current?.contains(e.target) &&
        !mobileMenuRef.current?.contains(e.target)
      ) {
        setIsMobileMenuOpened(false);
      }
    };

    document.addEventListener('click', closeDropdownHandler);

    return () => {
      document.removeEventListener('click', closeDropdownHandler);
    };
  }, []);

  useEffect(() => {
    const closeDropdown = () => {
      setIsUserDropdownOpened(false);
      setIsMobileMenuOpened(false);
    };

    events.on('routeChangeStart', closeDropdown);

    return () => {
      events.off('routeChangeStart', closeDropdown);
    };
  }, [events]);

  return (
    <StyledHeader>
      <LeftGroup>
        <button
          ref={mobileButtonRef}
          className="mobile-only"
          onClick={() => setIsMobileMenuOpened(true)}
        >
          <MenuIcon />
        </button>
        <Link href={playgroundLink.memberList()} passHref>
          <TextLinkButton isGroupPage={pathname === '/'}>
            <StyledLogo>
              <LogoIcon />
            </StyledLogo>
          </TextLinkButton>
        </Link>

        <MenuGroup className="pc-only">
          <Link href={playgroundLink.memberList()} passHref>
            <TextLinkButton isGroupPage={isGroupPage}>멤버</TextLinkButton>
          </Link>
          <Link href={playgroundLink.projectList()} passHref>
            <TextLinkButton isGroupPage={isGroupPage}>프로젝트</TextLinkButton>
          </Link>
          <Link href="/" passHref>
            <TextLinkButton isGroupPage={isGroupPage}>모임</TextLinkButton>
          </Link>
        </MenuGroup>
      </LeftGroup>

      <RightGroup>
        <div className="pc-only">
          <Link href={playgroundLink.projectUpload()} passHref>
            <UploadButton>
              <span>+</span>내 프로젝트 올리기
            </UploadButton>
          </Link>
        </div>

        <UserButton
          ref={dropdownButtonRef}
          onClick={() => setIsUserDropdownOpened(e => !e)}
        >
          <MemberIcon />
          <span>{me?.name}</span>
        </UserButton>
      </RightGroup>

      <UserDropdown ref={dropdownRef} isOpen={isUserDropdownOpened}>
        <Link
          href={
            me?.hasProfile
              ? playgroundLink.memberDetail(me.id)
              : playgroundLink.memberUpload()
          }
        >
          내 프로필
        </Link>
        <div onClick={() => 'logout()'}>로그아웃</div>
      </UserDropdown>

      <DimmedBackground
        isOpen={isMobileMenuOpened}
        onClick={() => setIsMobileMenuOpened(false)}
      />
      <MobileMenu isOpen={isMobileMenuOpened} ref={mobileMenuRef}>
        <Link
          href={
            me?.hasProfile
              ? playgroundLink.memberDetail(me.id)
              : playgroundLink.memberUpload()
          }
          passHref
        >
          <ProfileContainer>
            {/* TODO: 프로필 있을 경우와 아닐 경우에 따라 분기처리 필요 */}
            <EmptyProfileImage>
              <ProfileIcon />
            </EmptyProfileImage>
            <Name>{me?.name}</Name>
            <Spacer />
            <StyledForwardIcon />
          </ProfileContainer>
        </Link>

        <RouterWrapper>
          <Link href={playgroundLink.memberList()} passHref>
            <TextLinkButton isGroupPage={isGroupPage}>멤버</TextLinkButton>
          </Link>
          <Link href={playgroundLink.projectList()} passHref>
            <TextLinkButton isGroupPage={isGroupPage}>프로젝트</TextLinkButton>
          </Link>
          <Link href="/" passHref>
            <TextLinkButton isGroupPage={isGroupPage}>모임</TextLinkButton>
          </Link>
        </RouterWrapper>
        <Divider />
        <MenuWrapper>
          <Link href={playgroundLink.makers()} passHref>
            <MenuLink highlight={pathname === playgroundLink.makers()}>
              만든 사람들
            </MenuLink>
          </Link>
          <MenuLink href={FEEDBACK_FORM_URL} target="_blank">
            의견 제안하기
          </MenuLink>
          <MenuLink onClick={() => 'logout()'}>로그아웃</MenuLink>
        </MenuWrapper>
      </MobileMenu>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled('header', {
  //   position: 'relative',
  height: '80px',

  position: 'fixed',
  top: 0,
  right: 0,
  left: 0,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  zIndex: 100,
  backgroundColor: '$black100',
  padding: '0 36px',
  letterSpacing: '-0.01em',
  fontSize: '14px',
  lineHeight: '100%',

  boxSizing: 'border-box',
  '@mobile': {
    padding: '12px',
    height: '56px',
    fontSize: '12px',
  },
});

const LeftGroup = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 500,
});

const MenuGroup = styled(Box, {
  display: 'flex',
  gap: '16px',
});

const RightGroup = styled(Box, {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  '@mobile': {
    visibility: 'collapse',
  },
});

const StyledLogo = styled(Box, {
  marginRight: '40px',
  padding: '10px',
  '@mobile': {
    svg: {
      width: '49px',
      height: 'auto',
    },
  },
});

const TextLinkButton = styled('a', {
  cursor: 'pointer',
  variants: {
    isGroupPage: {
      true: {
        color: '#fff',
        fontWeight: 700,
        '@mobile': {
          fontAg: '18_bold_100',
        },
      },
      false: {
        color: '#C0C5C9',
        fontWeight: 500,
        '@mobile': {
          fontAg: '18_medium_100',
        },
      },
    },
  },
});

const UploadButton = styled('a', {
  boxSizing: 'border-box',
  borderRadius: '32px',
  backgroundColor: '#8040ff',
  cursor: 'pointer',
  padding: '12px 20px',
  height: '38px',
  fontWeight: 700,
  '& > span': {
    marginRight: '4px',
    fontWeight: 700,
  },
});

const UserButton = styled('button', {
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '19px',
  background: '#1c1d1e',
  cursor: 'pointer',
  padding: '3px 12px 3px 4px',
  height: '38px',
  fontWeight: 700,

  svg: {
    width: '32px',
    height: 'auto',
  },
  '& > span': {
    width: '64px',
    textAlign: 'center',
  },
  '@mobile': {
    padding: '3px 10px 3px 3px',
    height: '28px',
    svg: {
      width: '22px',
    },
    '& > span': {
      width: '42px',
      textAlign: 'center',
    },
  },
});
const UserDropdown = styled(Box, {
  display: 'flex',
  position: 'absolute',
  top: '80px',
  right: '36px',
  flexDirection: 'column',
  gap: '25px',
  transition: 'opacity 0.2s',
  zIndex: 100,
  borderRadius: '14px',
  background: '#272828',
  padding: '25px 20px',
  width: '176px',
  fontSize: '16px',
  '& > div': {
    cursor: 'pointer',
  },
  variants: {
    isOpen: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
  '@mobile': {
    display: 'none',
  },
});

const DimmedBackground = styled(Box, {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 100000,
  backgroundColor: 'rgb(0 0 0 / 70%)',
  width: '100%',
  height: '100vh',
  variants: {
    isOpen: {
      false: {
        visibility: 'hidden',
      },
    },
  },
});

const MobileMenu = styled(Box, {
  position: 'fixed',
  top: 0,
  left: 0,
  transition: 'transform 0.3s',
  zIndex: 100001,
  backgroundColor: '$black80',
  padding: '57px 20px',
  width: '212px',
  height: '100vh',
  variants: {
    isOpen: {
      true: {
        transform: 'translateX(0)',
      },
      false: {
        transform: 'translateX(-100%)',
      },
    },
  },
});

const ProfileContainer = styled('a', {
  display: 'flex',
  alignItems: 'center',
});

const EmptyProfileImage = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '14px',
  background: '$black60',
  width: '42px',
  height: '42px',
  svg: {
    width: '18px',
  },
});

const Name = styled(Box, {
  marginLeft: '12px',
  color: '$white',
  fontAg: '20_bold_100',
});
const RouterWrapper = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  marginTop: '30px',
  paddingBottom: '30px',
  color: '$white',
});

const Divider = styled(Box, {
  borderBottom: '1px solid $black60',
});
const MenuWrapper = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  marginTop: '21px',
});

const MenuLink = styled('a', {
  cursor: 'pointer',
  color: '$gray30',
  fontAg: '14_medium_100',
  variants: {
    highlight: {
      true: {
        color: '$white',
        fontAg: '14_bold_100',
      },
    },
  },
});

const Spacer = styled(Box, {
  flexGrow: 1,
});
const StyledForwardIcon = styled(BackIcon, {
  transform: 'rotate(180deg)',
});
