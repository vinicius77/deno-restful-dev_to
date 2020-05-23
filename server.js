import { PORT, HOST } from "./config/config.js";
import app from "./app.js";

/** =============== SERVER ==================== */

console.log(`Listening on ${HOST}:${PORT}`);
await app.listen(`${HOST}:${PORT}`);
