import { SignInButton, SignOutButton } from "@clerk/remix";
import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useConvexAuth } from "convex/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>

      <div>
        {isLoading ? (
          "..."
        ) : isAuthenticated ? (
          <SignOutButton />
        ) : (
          <SignInButton />
        )}
      </div>
      <Link to="/another">Go to another page</Link>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
