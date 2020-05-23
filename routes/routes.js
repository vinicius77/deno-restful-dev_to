import { Router } from "https://deno.land/x/oak/mod.ts";
import {
  getBooks,
  getBook,
  addBook,
  removeBook,
  updateBook,
} from "../controllers/books.js";

const baseURL = "/javascript/books";

const router = new Router();

router
  .get(`${baseURL}`, getBooks)
  .get(`${baseURL}/:id`, getBook)
  .post(`${baseURL}`, addBook)
  .delete(`${baseURL}/:id`, removeBook)
  .put(`${baseURL}/:id`, updateBook);

export default router;
