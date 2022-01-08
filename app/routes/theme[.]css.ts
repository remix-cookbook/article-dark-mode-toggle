import { LoaderFunction } from "remix";
import { theme } from "~/cookies";
import { parseCookie } from "~/utils/parseCookie";

const colors = {
  primary: {
    color: "#9333ea",
    text: "#fff",
  },
  secondary: {
    color: "#4f46e5",
    text: "#fff",
  },
  dark: {
    color: "#262626",
    text: "#fff",
  },
  light: {
    color: "#ffffff",
    text: "#262626",
  },
};

export const loader: LoaderFunction = async ({ request }) => {
  const cookie = await parseCookie(request, theme);
  if (!cookie.mode) cookie.mode = "light";

  let css = Object.entries(colors).reduce((acc, [key, value]) => {
    return acc.concat(
      `
        .btn-${key} { color: ${value.text}; background-color: ${value.color}; }
      `
    );
  }, "");

  css += ` 
    h1 { 
      color: ${cookie.mode === "light" ? "#000" : "#fff"}
    } 
    
    body {
      background-color: ${cookie.mode === "light" ? "#fff" : "#000"}
    }
  `;

  return new Response(css, {
    headers: {
      "Content-Type": "text/css",
    },
  });
};
