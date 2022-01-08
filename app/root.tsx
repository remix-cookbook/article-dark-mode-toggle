import {
  ActionFunction,
  Links,
  LinksFunction,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import { theme } from "~/cookies";

import styles from "./styles/_app.css";
import { parseCookie } from "./utils/parseCookie";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Sora:wght@300;500;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
    {
      rel: "stylesheet",
      href: "theme.css",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = await parseCookie(request, theme);
  if (!cookie.mode) cookie.mode = "light";

  return { mode: cookie.mode };
};

export const action: ActionFunction = async ({ request }) => {
  const cookie = await parseCookie(request, theme);
  const formData = await request.formData();

  cookie.mode = formData.get("mode") || cookie.mode || "light";

  return redirect("/", {
    headers: {
      "Set-Cookie": await theme.serialize(cookie),
    },
  });
};

export default function App() {
  const { mode } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet context={{ mode }} />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
