import router from 'next/router';
import { playgroundURL } from '@constants/url';
import { playgroundLink } from '@sopt-makers/playground-common';

const moveToProfileUploadPage = () => {
  const memberUploadHref = `${playgroundURL}${playgroundLink.memberUpload()}`;
  router.push(memberUploadHref);
};

export default moveToProfileUploadPage;
