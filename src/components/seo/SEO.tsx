import Head from 'next/head';

const SEO = () => {
  return (
    <Head>
      <title>SOPT Playground</title>
      <meta name="description" content="솝트와 더 친해지고 싶으신가요?" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="SOPT Playground" />
      <meta property="og:title" content="SOPT ㅣ 모임 신청·개설하기" />
      <meta property="og:description" content="솝트와 더 친해지고 싶으신가요?" />
      <meta property="og:image" content="/assets/images/thumbnail.jpg" />
      <meta property="og:url" content="https://playground.sopt.org/group" />
      <meta property="og:locale" content="ko_KR" />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:site" content="SOPT Playground" />
      <meta property="twitter:title" content="SOPT ㅣ 모임 신청·개설하기" />
      <meta property="twitter:description" content="솝트와 더 친해지고 싶으신가요?" />
      <meta property="twitter:image" content="/assets/images/thumbnail.jpg" />
      <meta property="twitter:url" content="https://playground.sopt.org/group" />
    </Head>
  );
};

export default SEO;
