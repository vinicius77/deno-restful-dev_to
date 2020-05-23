import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./routes/routes.js";

/** ============== APP ======================= */
const app = new Application();

app.use(router.routes());
/** You can choose the allowed methods here, for example, doesn't allowing delete methods */
app.use(router.allowedMethods());

export default app;
