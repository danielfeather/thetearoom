import nunjucks from "nunjucks";

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
  imageUrl: string;
  quantity: QuantityStatement;
}

const items: Item[] = [
  {
    id: "daniels-school-cake",
    name: "Daniel's School Cake",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://www.janespatisserie.com/wp-content/uploads/2022/07/SchoolCake4-2.jpg",
    quantity: "high",
  },
  {
    id: "french-earl-grey",
    name: "TWG French Earl Grey",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    imageUrl:
      "https://thewellnesstea.co.uk/cdn/shop/products/FrenchEarlGreyTCTWG3005.jpg?v=1756233999",
    quantity: "medium",
  },
];

Deno.serve(
  { port: 3000 },
  () =>
    new Response(
      nunjucks.render("home.html", { title: "The Tea Room", items }),
      {
        headers: {
          "content-type": "text/html; charset=utf-8",
        },
      }
    )
);
