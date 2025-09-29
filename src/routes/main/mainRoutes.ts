import { Hono } from "hono";
import { cors } from 'hono/cors';
import botWebhookHandler from "./botWebhookHandler";

const app = new Hono();
app.use(cors({ origin: "*" }));

app.post('/webhook', botWebhookHandler)


export default app