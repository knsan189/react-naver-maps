import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import Map from "./Map";
import Marker from "./Marker";
import { MAP_OPTIONS, NCP_KEY_ID } from "../const";

const meta: Meta<typeof Map> = {
  title: "Components/Map",
  component: Map,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Map>;

export const Default: Story = {
  args: {
    ncpKeyId: NCP_KEY_ID,
    mapOptions: MAP_OPTIONS,
    submodules: ["gl"],
    children: null,
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <Map {...args}>{args.children}</Map>
    </div>
  ),
};

export const WithCenter: Story = {
  args: {
    ncpKeyId: NCP_KEY_ID,
    mapOptions: MAP_OPTIONS,
    submodules: ["gl"],
    children: null,
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <Map {...args}>{args.children}</Map>
    </div>
  ),
};

export const Satellite: Story = {
  args: {
    ncpKeyId: NCP_KEY_ID,
    mapTypeId: "satellite" as naver.maps.MapTypeId,
    mapOptions: MAP_OPTIONS,
    submodules: ["gl"],
    children: null,
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <Map {...args}>{args.children}</Map>
    </div>
  ),
};

export const Hybrid: Story = {
  args: {
    ncpKeyId: NCP_KEY_ID,
    mapTypeId: "hybrid" as naver.maps.MapTypeId,
    mapOptions: MAP_OPTIONS,
    submodules: ["gl"],
    children: null,
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <Map {...args}>{args.children}</Map>
    </div>
  ),
};

export const Terrain: Story = {
  args: {
    ncpKeyId: NCP_KEY_ID,
    mapTypeId: "terrain" as naver.maps.MapTypeId,
    mapOptions: MAP_OPTIONS,
    submodules: ["gl"],
    children: null,
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <Map {...args}>{args.children}</Map>
    </div>
  ),
};

export const WithEventHandlers: Story = {
  args: {
    ncpKeyId: NCP_KEY_ID,
    mapOptions: MAP_OPTIONS,
    submodules: ["gl"],
    onLoad: action("onLoad"),
    onZoomStart: action("onZoomStart"),
    onZoomEnd: action("onZoomEnd"),
    onDragStart: action("onDragStart"),
    onDragEnd: action("onDragEnd"),
    children: null,
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <Map {...args}>{args.children}</Map>
    </div>
  ),
};

export const WithMarker: Story = {
  args: {
    ncpKeyId: NCP_KEY_ID,
    mapOptions: MAP_OPTIONS,
    submodules: ["gl"],
    children: (
      <Marker
        position={{
          x: 126.978,
          y: 37.5665,
        }}
      />
    ),
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <Map {...args}>{args.children}</Map>
    </div>
  ),
};

// export const CustomStyle: Story = {
//   args: {
//     ncpKeyId: NCP_KEY_ID,
//     mapOptions: MAP_OPTIONS,
//     submodules: ["gl"],
//     style: {
//       borderRadius: "12px",
//       border: "2px solid #007bff",
//       boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     },
//     children: null,
//   },
//   render: (args) => (
//     <div style={{ width: "100vw", height: 500 }}>
//       <Map {...args}>{args.children}</Map>
//     </div>
//   ),
// };

export const WithId: Story = {
  args: {
    id: "custom-map-id",
    ncpKeyId: NCP_KEY_ID,
    mapOptions: MAP_OPTIONS,
    submodules: ["gl"],
    children: null,
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <Map {...args}>{args.children}</Map>
    </div>
  ),
};
