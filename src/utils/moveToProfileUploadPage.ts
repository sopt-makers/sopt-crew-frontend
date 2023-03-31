import { playgroundLink } from '@sopt-makers/playground-common';

const moveToProfileUploadPage = () => {
  window.location.pathname = `${playgroundLink.memberUpload()}`;
};

export default moveToProfileUploadPage;
