import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import Map from "./Map";
import MapProvider from "./MapProvider";
import Polyline from "./Polyline";
import { NCP_KEY_ID, MAP_OPTIONS } from "../const";

const meta: Meta<typeof Polyline> = {
  title: "Components/Polyline",
  component: Polyline,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Polyline>;

export const Default: Story = {
  args: {
    path: [
      [126.978, 37.5665],
      [126.988, 37.5765],
      [126.998, 37.5665],
    ],
    strokeColor: "#ff0000",
    strokeWeight: 3,
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <MapProvider>
        <Map
          ncpKeyId={NCP_KEY_ID}
          mapOptions={MAP_OPTIONS}
          submodules={["gl"]}
        >
          <Polyline {...args} />
        </Map>
      </MapProvider>
    </div>
  ),
};

export const MultiplePolylines: Story = {
  render: () => (
    <div style={{ width: "100vw", height: 500 }}>
      <MapProvider>
        <Map
          ncpKeyId={NCP_KEY_ID}
          mapOptions={MAP_OPTIONS}
          submodules={["gl"]}
        >
          <Polyline
            path={[
              [126.978, 37.5665],
              [126.988, 37.5765],
            ]}
            strokeColor="#ff0000"
            strokeWeight={3}
          />
          <Polyline
            path={[
              [126.968, 37.5565],
              [126.978, 37.5665],
            ]}
            strokeColor="#00ff00"
            strokeWeight={3}
          />
          <Polyline
            path={[
              [126.988, 37.5765],
              [126.998, 37.5665],
            ]}
            strokeColor="#0000ff"
            strokeWeight={3}
          />
        </Map>
      </MapProvider>
    </div>
  ),
};

export const WithClickHandler: Story = {
  args: {
    path: [
      [126.978, 37.5665],
      [126.988, 37.5765],
      [126.998, 37.5665],
    ],
    strokeColor: "#ff0000",
    strokeWeight: 3,
    clickable: true,
    onClick: action("onClick"),
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <MapProvider>
        <Map
          ncpKeyId={NCP_KEY_ID}
          mapOptions={MAP_OPTIONS}
          submodules={["gl"]}
        >
          <Polyline {...args} />
        </Map>
      </MapProvider>
    </div>
  ),
};

export const WithMouseEnterHandler: Story = {
  args: {
    path: [
      [126.978, 37.5665],
      [126.988, 37.5765],
      [126.998, 37.5665],
    ],
    strokeColor: "#ff0000",
    strokeWeight: 3,
    onMouseEnter: action("onMouseEnter"),
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <MapProvider>
        <Map
          ncpKeyId={NCP_KEY_ID}
          mapOptions={MAP_OPTIONS}
          submodules={["gl"]}
        >
          <Polyline {...args} />
        </Map>
      </MapProvider>
    </div>
  ),
};

export const WithCustomStyles: Story = {
  render: () => (
    <div style={{ width: "100vw", height: 500 }}>
      <MapProvider>
        <Map
          ncpKeyId={NCP_KEY_ID}
          mapOptions={MAP_OPTIONS}
          submodules={["gl"]}
        >
          <Polyline
            path={[
              [126.978, 37.5665],
              [126.988, 37.5765],
              [126.998, 37.5665],
            ]}
            strokeColor="#4ecdc4"
            strokeWeight={5}
            strokeLineCap="round"
            strokeLineJoin="round"
          />
        </Map>
      </MapProvider>
    </div>
  ),
};

export const ComplexRoute: Story = {
  render: () => (
    <div style={{ width: "100vw", height: 500 }}>
      <MapProvider>
        <Map
          ncpKeyId={NCP_KEY_ID}
          mapOptions={{
            center: { x: 126.983, y: 37.5715 },
            zoom: 13,
            gl: true,
          }}
          submodules={["gl"]}
        >
          <Polyline
            path={[
              [126.968, 37.5565],
              [126.978, 37.5665],
              [126.988, 37.5765],
              [126.998, 37.5665],
              [127.008, 37.5565],
            ]}
            strokeColor="#9b59b6"
            strokeWeight={4}
            strokeLineCap="round"
            strokeLineJoin="round"
            clickable={true}
            onClick={action("routeClick")}
          />
        </Map>
      </MapProvider>
    </div>
  ),
};

export const ThickLine: Story = {
  render: () => (
    <div style={{ width: "100vw", height: 500 }}>
      <MapProvider>
        <Map
          ncpKeyId={NCP_KEY_ID}
          mapOptions={MAP_OPTIONS}
          submodules={["gl"]}
        >
          <Polyline
            path={[
              [126.978, 37.5665],
              [126.988, 37.5765],
            ]}
            strokeColor="#e74c3c"
            strokeWeight={10}
            strokeLineCap="round"
          />
        </Map>
      </MapProvider>
    </div>
  ),
};
