import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp, V2_ClerkErrorBoundary } from "@clerk/remix";
import { useAuth } from "@clerk/remix";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useMemo } from "react";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader: LoaderFunction = (args) =>
  rootAuthLoader(args, () => ({
    ENV: {
      CONVEX_URL: (console.log(process.env.CONVEX_URL), process.env.CONVEX_URL),
    },
  }));

export default ClerkApp(App);

export const ErrorBoundary = V2_ClerkErrorBoundary();

function App() {
  const data = useLoaderData<typeof loader>();
  const { CONVEX_URL } = data.ENV;
  console.log(CONVEX_URL);

  const convex = useMemo(() => new ConvexReactClient(CONVEX_URL), [CONVEX_URL]);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <Outlet />
        </ConvexProviderWithClerk>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
