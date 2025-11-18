import nunjucks from "nunjucks";

nunjucks.configure("views", {
  autoescape: true,
  noCache: true,
});

Deno.serve(
  { port: 3000 },
  () =>
    new Response(nunjucks.render("home.html", { title: "The Tea Room" }), {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    })
);
