import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    'installation',
    {
      type: 'category',
      label: 'API 참조',
      items: [
        'api/map',
        'api/marker',
        'api/overlay',
        'api/polygon',
        'api/polyline',
      ],
    },
    {
      type: 'category',
      label: '예제',
      items: [
        'examples/basic-map',
        'examples/marker-example',
        'examples/overlay-example',
        'examples/polygon-polyline-example',
        'examples/interactive-map',
        'examples/complete-example',
      ],
    },
  ],
};

export default sidebars;
