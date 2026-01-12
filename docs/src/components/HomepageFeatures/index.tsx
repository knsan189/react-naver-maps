import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: '쉽게 사용하기',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        네이버 지도 API를 React 컴포넌트로 쉽게 사용할 수 있습니다.
        직관적인 API로 빠르게 지도를 구현할 수 있습니다.
      </>
    ),
  },
  {
    title: '풍부한 기능',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Marker, Overlay, Polygon, Polyline 등 다양한 오버레이를 지원하며,
        React 컴포넌트를 지도 오버레이로 사용할 수 있습니다.
      </>
    ),
  },
  {
    title: 'TypeScript 지원',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        TypeScript로 작성되어 완전한 타입 정의를 제공합니다.
        트리 쉐이킹을 지원하며 ESM과 CommonJS 모두 지원합니다.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
