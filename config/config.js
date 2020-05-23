const env = Deno.env.toObject();
export const PORT = env.PORT || 5000;
export const HOST = env.HOST || "127.0.0.1";
