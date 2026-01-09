import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Map from "./Map";
import Marker from "./Marker";
import { NCP_KEY_ID } from "../const";

const meta: Meta<typeof Marker> = {
  title: "Components/Marker",
  component: Marker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Marker>;

export const Default: Story = {
  args: {
    position: {
      x: 126.978,
      y: 37.5665,
    },
  },
  render: (args) => (
    <Map
      ncpKeyId={NCP_KEY_ID}
      mapOptions={{
        center: args.position,
        zoom: 15,
        gl: true,
      }}
      submodules={["gl"]}
      style={{ width: "100vw", height: 500 }}
    >
      <Marker {...args} />
    </Map>
  ),
};

export const WithCustomIcon: Story = {
  args: {
    position: {
      x: 126.978,
      y: 37.5665,
    },
    icon: {
      content:
        '<div style="background: red; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white;"></div>',
      anchor: {
        x: 15,
        y: 15,
      },
    },
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <Map
        ncpKeyId={NCP_KEY_ID}
        mapOptions={{
          center: {
            x: 126.978,
            y: 37.5665,
          },
          zoom: 15,
          gl: true,
        }}
        submodules={["gl"]}
      >
        <Marker {...args} />
      </Map>
    </div>
  ),
};

export const MultipleMarkers: Story = {
  render: () => (
    <Map
      ncpKeyId={NCP_KEY_ID}
      style={{ width: "100vw", height: 500 }}
      mapOptions={{
        center: {
          x: 126.978,
          y: 37.5665,
        },
        zoom: 13,
        gl: true,
      }}
      submodules={["gl"]}
    >
      <Marker
        position={{
          x: 126.978,
          y: 37.5665,
        }}
      />
      <Marker
        position={{
          x: 126.9895,
          y: 37.5651,
        }}
      />
      <Marker
        position={{
          x: 126.992,
          y: 37.57,
        }}
      />
    </Map>
  ),
};

export const WithClickHandler: Story = {
  args: {
    position: {
      x: 126.978,
      y: 37.5665,
    },
    onClick: action("onClick"),
  },
  render: (args) => (
    <Map
      ncpKeyId={NCP_KEY_ID}
      mapOptions={{
        center: args.position,
        zoom: 15,
        gl: true,
      }}
      submodules={["gl"]}
      style={{ width: "100vw", height: 500 }}
    >
      <Marker {...args} />
    </Map>
  ),
};

export const WithZIndex: Story = {
  render: () => (
    <Map
      ncpKeyId={NCP_KEY_ID}
      mapOptions={{
        center: {
          x: 126.978,
          y: 37.5665,
        },
        zoom: 15,
        gl: true,
      }}
      submodules={["gl"]}
      style={{ width: "100vw", height: 500 }}
    >
      <Marker
        position={{
          x: 126.978,
          y: 37.5665,
        }}
        zIndex={100}
        icon={{
          content:
            '<div style="background: blue; width: 40px; height: 40px; border-radius: 50%; border: 2px solid white;"></div>',
          anchor: {
            x: 20,
            y: 20,
          },
        }}
      />
      <Marker
        position={{
          x: 126.978,
          y: 37.5665,
        }}
        zIndex={200}
        icon={{
          content:
            '<div style="background: red; width: 30px; height: 30px; border-radius: 50%; border: 2px solid white;"></div>',
          anchor: {
            x: 15,
            y: 15,
          },
        }}
      />
    </Map>
  ),
};
