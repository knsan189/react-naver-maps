import React from 'react';
import './ExampleComponent.css';

export interface ExampleComponentProps {
  /**
   * 컴포넌트에 표시할 텍스트
   */
  text?: string;
  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: () => void;
}

/**
 * 예제 컴포넌트입니다.
 */
const ExampleComponent: React.FC<ExampleComponentProps> = ({
  text = 'Hello, React Naver Maps!',
  onClick,
}) => {
  return (
    <div className="example-component" onClick={onClick}>
      <p>{text}</p>
    </div>
  );
};

export default ExampleComponent;

