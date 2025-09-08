import { GTM_ID } from '@util/gtm';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import { getCssText } from '../stitches.config';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
          <script type="text/javascript" src="//developers.kakao.com/sdk/js/kakao.min.js" />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
          <noscript>You need to enable JavaScript to run this app.</noscript>
        </body>
      </Html>
    );
  }
}
