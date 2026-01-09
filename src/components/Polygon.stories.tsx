import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import Map from "./Map";
import MapProvider from "./MapProvider";
import Polygon from "./Polygon";
import { NCP_KEY_ID, MAP_OPTIONS } from "../const";

const meta: Meta<typeof Polygon> = {
  title: "Components/Polygon",
  component: Polygon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Polygon>;

export const Default: Story = {
  args: {
    paths: [
      [
        { x: 126.978, y: 37.5665 },
        { x: 126.988, y: 37.5665 },
        { x: 126.988, y: 37.5765 },
        { x: 126.978, y: 37.5765 },
      ],
    ],
    fillColor: "#ff0000",
    fillOpacity: 0.3,
    strokeColor: "#0000ff",
    strokeWeight: 2,
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <MapProvider>
        <Map ncpKeyId={NCP_KEY_ID} mapOptions={MAP_OPTIONS} submodules={["gl"]}>
          <Polygon {...args} />
        </Map>
      </MapProvider>
    </div>
  ),
};

export const WithMultiplePaths: Story = {
  render: () => (
    <div style={{ width: "100vw", height: 500 }}>
      <MapProvider>
        <Map ncpKeyId={NCP_KEY_ID} mapOptions={MAP_OPTIONS} submodules={["gl"]}>
          <Polygon
            paths={[
              [
                { x: 126.978, y: 37.5665 },
                { x: 126.988, y: 37.5665 },
                { x: 126.988, y: 37.5765 },
                { x: 126.978, y: 37.5765 },
              ],
            ]}
            fillColor="#ff0000"
            fillOpacity={0.3}
            strokeColor="#0000ff"
            strokeWeight={2}
          />
          <Polygon
            paths={[
              [
                { x: 126.968, y: 37.5565 },
                { x: 126.978, y: 37.5565 },
                { x: 126.978, y: 37.5665 },
                { x: 126.968, y: 37.5665 },
              ],
            ]}
            fillColor="#00ff00"
            fillOpacity={0.3}
            strokeColor="#ff00ff"
            strokeWeight={2}
          />
        </Map>
      </MapProvider>
    </div>
  ),
};

export const WithClickHandler: Story = {
  args: {
    paths: [
      [
        { x: 126.978, y: 37.5665 },
        { x: 126.988, y: 37.5665 },
        { x: 126.988, y: 37.5765 },
        { x: 126.978, y: 37.5765 },
      ],
    ],
    fillColor: "#ff0000",
    fillOpacity: 0.3,
    strokeColor: "#0000ff",
    strokeWeight: 2,
    onClick: action("onClick"),
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <MapProvider>
        <Map ncpKeyId={NCP_KEY_ID} mapOptions={MAP_OPTIONS} submodules={["gl"]}>
          <Polygon {...args} />
        </Map>
      </MapProvider>
    </div>
  ),
};

export const WithMouseEnterHandler: Story = {
  args: {
    paths: [
      [
        { x: 126.978, y: 37.5665 },
        { x: 126.988, y: 37.5665 },
        { x: 126.988, y: 37.5765 },
        { x: 126.978, y: 37.5765 },
      ],
    ],
    fillColor: "#ff0000",
    fillOpacity: 0.3,
    strokeColor: "#0000ff",
    strokeWeight: 2,
    onMouseEnter: action("onMouseEnter"),
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <MapProvider>
        <Map ncpKeyId={NCP_KEY_ID} mapOptions={MAP_OPTIONS} submodules={["gl"]}>
          <Polygon {...args} />
        </Map>
      </MapProvider>
    </div>
  ),
};

export const WithCustomStyles: Story = {
  render: () => (
    <div style={{ width: "100vw", height: 500 }}>
      <MapProvider>
        <Map ncpKeyId={NCP_KEY_ID} mapOptions={MAP_OPTIONS} submodules={["gl"]}>
          <Polygon
            paths={[
              [
                { x: 126.978, y: 37.5665 },
                { x: 126.988, y: 37.5665 },
                { x: 126.988, y: 37.5765 },
                { x: 126.978, y: 37.5765 },
              ],
            ]}
            fillColor="#ff6b6b"
            fillOpacity={0.5}
            strokeColor="#4ecdc4"
            strokeWeight={3}
            strokeStyle="dash"
            strokeLineCap="round"
            strokeLineJoin="round"
            zIndex={100}
          />
        </Map>
      </MapProvider>
    </div>
  ),
};

export const ComplexPolygon: Story = {
  render: () => (
    <div style={{ width: "100vw", height: 500 }}>
      <MapProvider>
        <Map
          ncpKeyId={NCP_KEY_ID}
          mapOptions={{
            center: { x: 126.983, y: 37.5715 },
            zoom: 14,
            gl: true,
          }}
          submodules={["gl"]}
        >
          <Polygon
            paths={[
              [
                { x: 126.978, y: 37.5665 },
                { x: 126.985, y: 37.5685 },
                { x: 126.988, y: 37.5765 },
                { x: 126.98, y: 37.5785 },
                { x: 126.975, y: 37.5725 },
              ],
            ]}
            fillColor="#9b59b6"
            fillOpacity={0.4}
            strokeColor="#8e44ad"
            strokeWeight={4}
            zIndex={50}
          />
        </Map>
      </MapProvider>
    </div>
  ),
};
