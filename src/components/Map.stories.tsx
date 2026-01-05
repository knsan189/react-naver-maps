import { Meta, StoryObj } from "@storybook/react";
import Map from "./Map";

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
    ncpKeyId: "c9ay3yq15z",
    mapOptions: {
      gl: true,
    },
    submodules: ["gl"],
  },
  render: (args) => (
    <div style={{ width: "100vw", height: 500 }}>
      <Map {...args} />
    </div>
  ),
};

