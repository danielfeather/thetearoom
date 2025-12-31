import nunjucks from "nunjucks";
import { Manifest } from "vite";

import { Hono } from "hono";
import { serveStatic } from "hono/deno";

nunjucks.configure("views", {
  autoescape: true,
  noCache: true,
});

const QuantityStatement = {
  Low: "low",
  Medium: "medium",
  High: "high",
} as const;

type QuantityStatement =
  (typeof QuantityStatement)[keyof typeof QuantityStatement];

interface Item {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  quantity: QuantityStatement;
}

const app = new Hono();

const items: Item[] = [
  {
    id: "daniels-school-cake",
    name: "Daniel's School Cake",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: null,
    quantity: "high",
  },
  {
    id: "french-earl-grey",
    name: "TWG French Earl Grey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl: null,
    quantity: "medium",
  },
];

const manifest: Manifest | undefined = await Deno.readTextFile(
  "public/.vite/manifest.json"
)
  .then(JSON.parse)
  .catch(() => undefined);

let scripts = [];
let styles = [];

if (!manifest) {
  scripts.push(
    "http://localhost:5173/@vite/client",
    "http://localhost:5173/client/main.js"
  );
}

if (manifest) {
  for (const [entry, chunk] of Object.entries(manifest)) {
    scripts.push(chunk.file);

    if (chunk.css) {
      styles.push(...chunk.css);
    }
  }
}

app.get("/", (ctx) => {
  return ctx.html(
    nunjucks.render("home.html", {
      title: "The Tea Room",
      items,
      scripts,
      styles,
    }),
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    }
  );
});

app.use("/assets/.vite/*", (ctx) => {
  return Promise.resolve(ctx.notFound());
});

app.use(
  "/*",
  serveStatic({
    root: "./public",
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`);
    },
  })
);

function port() {
  const portEnv = Number(Deno.env.get("PORT"));

  if (!portEnv) {
    return 3000;
  }

  return Number(portEnv);
}

Deno.serve({ port: port() }, app.fetch);
