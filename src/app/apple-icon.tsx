import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: 40,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: 36,
            width: 0,
            height: 0,
            borderLeft: "48px solid transparent",
            borderRight: "48px solid transparent",
            borderBottom: "70px solid #E8F2EE",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 38,
            width: 28,
            height: 28,
            borderRadius: 999,
            background: "#7EB8C9",
          }}
        />
      </div>
    ),
    size
  );
}
