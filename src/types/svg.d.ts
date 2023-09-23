// .svg 확장자의 파일에서 ReactComponent의 존재를 인식시켜 주는 부분
declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: REact.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default ReactComponent;
}

declare module '*.svg?rect' {
  import React = require('react');

  export const ReactComponent: REact.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default ReactComponent;
}

declare module '*.svg?v2' {
  import React = require('react');

  export const ReactComponent: REact.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default ReactComponent;
}
