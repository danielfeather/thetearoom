FROM denoland/deno:2.5.6

WORKDIR /app

COPY deno.json .

RUN deno install --vendor

COPY . .

RUN deno run build

EXPOSE 3000

CMD ["run", "--vendor", "--allow-net", "--allow-read", "main.ts"]