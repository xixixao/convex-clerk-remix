import type { V2_MetaFunction } from "@remix-run/node";
import { useConvexAuth } from "convex/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  console.log(useConvexAuth());
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Hey</h1>
    </div>
  );
}
