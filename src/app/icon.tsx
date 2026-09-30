import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1B4538",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 6,
            width: 0,
            height: 0,
            borderLeft: "10px solid transparent",
            borderRight: "10px solid transparent",
            borderBottom: "14px solid #E8F2EE",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 6,
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "#7EB8C9",
          }}
        />
      </div>
    ),
    size
  );
}
