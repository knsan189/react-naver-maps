import type { Meta, StoryObj } from '@storybook/react';
import ExampleComponent from './ExampleComponent';

const meta: Meta<typeof ExampleComponent> = {
  title: 'Components/ExampleComponent',
  component: ExampleComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '컴포넌트에 표시할 텍스트',
    },
    onClick: {
      action: 'clicked',
      description: '클릭 이벤트 핸들러',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExampleComponent>;

export const Default: Story = {
  args: {
    text: 'Hello, React Naver Maps!',
  },
};

export const CustomText: Story = {
  args: {
    text: '커스텀 텍스트입니다',
  },
};

export const WithClickHandler: Story = {
  args: {
    text: '클릭해보세요!',
    onClick: () => {
      alert('클릭되었습니다!');
    },
  },
};

