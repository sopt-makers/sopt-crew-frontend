import KakaoMapIcon from '@assets/svg/ic_kakao_map.svg';
import NaverMapIcon from '@assets/svg/ic_naver_map.svg';
import { SVGProps } from 'react';
import { MapLinkKey } from './type';

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element;

export const LINK_OPTIONS: { key: MapLinkKey; label: string; Icon: IconComponent }[] = [
  { key: 'naverLink', label: '네이버 지도', Icon: NaverMapIcon },
  { key: 'kakaoLink', label: '카카오 맵', Icon: KakaoMapIcon },
];
