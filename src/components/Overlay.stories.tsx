import { Meta, StoryObj } from "@storybook/react";
import Map from "./Map";
import Overlay from "./Overlay";
import { MAP_OPTIONS, NCP_KEY_ID } from "../const";

const meta: Meta<typeof Overlay> = {
  title: "Components/Overlay",
  component: Overlay,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const Default: Story = {
  args: {
    position: {
      x: 126.978,
      y: 37.5665,
    },
    zIndex: 100,
    anchor: "center-center",
    children: (
      <div
        style={{
          background: "white",
          padding: "12px 16px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          border: "1px solid #e0e0e0",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        서울시청
      </div>
    ),
  },
  render: (args) => (
    <Map
      ncpKeyId={NCP_KEY_ID}
      mapOptions={MAP_OPTIONS}
      submodules={["gl"]}
      style={{ width: "100vw", height: 500 }}
    >
      <Overlay {...args} />
    </Map>
  ),
};

export const TopLeft: Story = {
  args: {
    position: {
      x: 126.978,
      y: 37.5665,
    },
    zIndex: 100,
    anchor: "top-left",
    children: (
      <div
        style={{
          background: "#007bff",
          color: "white",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        Top Left
      </div>
    ),
  },
  render: (args) => (
    <Map
      ncpKeyId={NCP_KEY_ID}
      mapOptions={MAP_OPTIONS}
      submodules={["gl"]}
      style={{ width: "100vw", height: 500 }}
    >
      <Overlay {...args} />
    </Map>
  ),
};

export const TopCenter: Story = {
  args: {
    position: {
      x: 126.978,
      y: 37.5665,
    },
    zIndex: 100,
    anchor: "top-center",
    children: (
      <div
        style={{
          background: "#28a745",
          color: "white",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        Top Center
      </div>
    ),
  },
  render: (args) => (
    <Map
      ncpKeyId={NCP_KEY_ID}
      mapOptions={MAP_OPTIONS}
      submodules={["gl"]}
      style={{ width: "100vw", height: 500 }}
    >
      <Overlay {...args} />
    </Map>
  ),
};

export const TopRight: Story = {
  args: {
    position: {
      x: 126.978,
      y: 37.5665,
    },
    zIndex: 100,
    anchor: "top-right",
    children: (
      <div
        style={{
          background: "#dc3545",
          color: "white",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        Top Right
      </div>
    ),
  },
  render: (args) => (
    <Map
      ncpKeyId={NCP_KEY_ID}
      mapOptions={MAP_OPTIONS}
      submodules={["gl"]}
      style={{ width: "100vw", height: 500 }}
    >
      <Overlay {...args} />
    </Map>
  ),
};

export const BottomCenter: Story = {
  args: {
    position: {
      x: 126.978,
      y: 37.5665,
    },
    zIndex: 100,
    anchor: "bottom-center",
    children: (
      <div
        style={{
          background: "#ffc107",
          color: "#000",
          padding: "8px 12px",
          borderRadius: "6px",
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        Bottom Center
      </div>
    ),
  },
  render: (args) => (
    <Map
      ncpKeyId={NCP_KEY_ID}
      mapOptions={MAP_OPTIONS}
      submodules={["gl"]}
      style={{ width: "100vw", height: 500 }}
    >
      <Overlay {...args} />
    </Map>
  ),
};

export const CustomStyled: Story = {
  args: {
    position: {
      x: 126.978,
      y: 37.5665,
    },
    zIndex: 100,
    anchor: "center-center",
    children: (
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          padding: "20px 24px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          fontSize: "16px",
          fontWeight: "600",
          minWidth: "200px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "24px", marginBottom: "8px" }}>📍</div>
        <div>서울시청</div>
        <div style={{ fontSize: "12px", opacity: 0.9, marginTop: "4px" }}>
          서울특별시 중구 세종대로 110
        </div>
      </div>
    ),
  },
  render: (args) => (
    <Map
      ncpKeyId={NCP_KEY_ID}
      mapOptions={MAP_OPTIONS}
      submodules={["gl"]}
      style={{ width: "100vw", height: 500 }}
    >
      <Overlay {...args} />
    </Map>
  ),
};

export const MultipleOverlays: Story = {
  render: () => (
    <Map
      ncpKeyId={NCP_KEY_ID}
      mapOptions={MAP_OPTIONS}
      submodules={["gl"]}
      style={{ width: "100vw", height: 500 }}
    >
      <Overlay
        position={{ x: 126.978, y: 37.5665 }}
        zIndex={100}
        anchor="top-center"
      >
        <div
          style={{
            background: "#007bff",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          서울시청
        </div>
      </Overlay>
      <Overlay
        position={{ x: 126.9895, y: 37.5651 }}
        zIndex={100}
        anchor="top-center"
      >
        <div
          style={{
            background: "#28a745",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          명동
        </div>
      </Overlay>
      <Overlay
        position={{ x: 126.992, y: 37.57 }}
        zIndex={100}
        anchor="top-center"
      >
        <div
          style={{
            background: "#dc3545",
            color: "white",
            padding: "8px 12px",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          을지로
        </div>
      </Overlay>
    </Map>
  ),
};

export const WithZIndex: Story = {
  render: () => (
    <Map
      ncpKeyId={NCP_KEY_ID}
      mapOptions={MAP_OPTIONS}
      submodules={["gl"]}
      style={{ width: "100vw", height: 500 }}
    >
      <Overlay
        position={{ x: 126.978, y: 37.5665 }}
        zIndex={100}
        anchor="center-center"
      >
        <div
          style={{
            background: "rgba(0, 123, 255, 0.8)",
            color: "white",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          zIndex: 100
        </div>
      </Overlay>
      <Overlay
        position={{ x: 126.978, y: 37.5665 }}
        zIndex={200}
        anchor="center-center"
      >
        <div
          style={{
            background: "rgba(220, 53, 69, 0.9)",
            color: "white",
            padding: "16px 20px",
            borderRadius: "10px",
            fontSize: "16px",
            fontWeight: "700",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        >
          zIndex: 200 (위에 있음)
        </div>
      </Overlay>
    </Map>
  ),
};

export const AllAnchors: Story = {
  render: () => (
    <Map
      ncpKeyId={NCP_KEY_ID}
      mapOptions={MAP_OPTIONS}
      submodules={["gl"]}
      style={{ width: "100vw", height: 500 }}
    >
      <Overlay
        position={{ x: 126.978, y: 37.5665 }}
        zIndex={100}
        anchor="top-left"
      >
        <div
          style={{
            background: "#007bff",
            color: "white",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          TL
        </div>
      </Overlay>
      <Overlay
        position={{ x: 126.978, y: 37.5665 }}
        zIndex={100}
        anchor="top-center"
      >
        <div
          style={{
            background: "#28a745",
            color: "white",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          TC
        </div>
      </Overlay>
      <Overlay
        position={{ x: 126.978, y: 37.5665 }}
        zIndex={100}
        anchor="top-right"
      >
        <div
          style={{
            background: "#dc3545",
            color: "white",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          TR
        </div>
      </Overlay>
      <Overlay
        position={{ x: 126.978, y: 37.5665 }}
        zIndex={100}
        anchor="center-left"
      >
        <div
          style={{
            background: "#ffc107",
            color: "#000",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          CL
        </div>
      </Overlay>
      <Overlay
        position={{ x: 126.978, y: 37.5665 }}
        zIndex={100}
        anchor="center-center"
      >
        <div
          style={{
            background: "#17a2b8",
            color: "white",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          CC
        </div>
      </Overlay>
      <Overlay
        position={{ x: 126.978, y: 37.5665 }}
        zIndex={100}
        anchor="center-right"
      >
        <div
          style={{
            background: "#6f42c1",
            color: "white",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          CR
        </div>
      </Overlay>
      <Overlay
        position={{ x: 126.978, y: 37.5665 }}
        zIndex={100}
        anchor="bottom-left"
      >
        <div
          style={{
            background: "#fd7e14",
            color: "white",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          BL
        </div>
      </Overlay>
      <Overlay
        position={{ x: 126.978, y: 37.5665 }}
        zIndex={100}
        anchor="bottom-center"
      >
        <div
          style={{
            background: "#20c997",
            color: "white",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          BC
        </div>
      </Overlay>
      <Overlay
        position={{ x: 126.978, y: 37.5665 }}
        zIndex={100}
        anchor="bottom-right"
      >
        <div
          style={{
            background: "#e83e8c",
            color: "white",
            padding: "6px 10px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: "600",
          }}
        >
          BR
        </div>
      </Overlay>
    </Map>
  ),
};
