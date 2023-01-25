import Fastify from "fastify";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";
import SendMessage from "./infra/sender";
import ReceiveMessage from "./infra/receiver";

const app = Fastify();
const prisma = new PrismaClient();

app.register(cors);

app.get("/", async () => {
  const habits = await prisma.habit.findMany();
  SendMessage({
    title: "get all habits",
    method: "GET",
    route: "/",
  });
  return habits;
});

app.get("/log", async () => {
  return ReceiveMessage();
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server running");
  });
