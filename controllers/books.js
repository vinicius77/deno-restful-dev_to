import books from "../data.js";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

/** All functions receive a context object as standard parameter (e.g. const getBooks = (context) => { ... })
 * but I destructure it using { request, response, next} when needed just because */

// METHOD: GET
// ROUTE: /javascript/books
// DESCRIPTION: Brings all books
const getBooks = ({ response }) => {
  response.status = 200;
  response.body = books;
};

// METHOD: GET
// ROUTE: /javascript/books/:id
// DESCRIPTION: Brings book by id
const getBook = ({ params, response }) => {
  const book = books.filter((book) => book.id.toString() === params.id);

  if (!book.length) {
    response.status = 404;
    response.body = { message: `Book with "id: ${params.id}" not found.` };
    return;
  }

  response.status = 200;
  response.body = book;
  return;
};

// METHOD: POST
// ROUTE: /javascript/books/
// DESCRIPTION: Adds a new book
const addBook = async ({ request, response }) => {
  const body = await request.body();

  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      message: "Something went wrong. Try add a new book later.",
    };
    return;
  }

  const book = body.value;
  book.id = v4.generate();
  books.push(book);

  response.status = 201;
  response.body = book;
};

// METHOD: DELETE
// ROUTE: /javascript/books/:name
// DESCRIPTION: Removes a book from the list
const removeBook = async ({ params, response }) => {
  /** Returns a new array filtered without the book with id equals to params.id */
  const booksFiltered = books.filter((book) =>
    book.id.toString() !== params.id.toString()
  );

  /** If length of both arrays are equals we assume that no deletion happened so
   * we return as response that the book was note found in the list */
  if (booksFiltered.length === books.length) {
    response.status = 400;
    response.body = {
      message: `Book with ID ${params.id} Not Found On Books List`,
    };
    return;
  }

  response.body = {
    message: "Successfully Deleted",
    booksFiltered,
  };

  response.status = 200;
};

// METHOD: PUT
// ROUTE: /javascript/books/:name
// DESCRIPTION: Updates a book from the list
const updateBook = async ({ params, request, response }) => {
  /** Filters the books list using the params.id  */
  const bookToBeUpdated = books.filter((book) =>
    book.id.toString() === params.id.toString()
  );

  const body = await request.body();
  /*  Destructures the request body to update just the sent book fields*/
  const { title, author, url } = body.value;

  /** If after filter the books array a book was found, updates it */
  if (bookToBeUpdated.length) {
    title ? bookToBeUpdated[0].title = title : bookToBeUpdated[0].title;
    author ? bookToBeUpdated[0].author = author : bookToBeUpdated[0].author;
    url ? bookToBeUpdated[0].url = url : bookToBeUpdated[0].url;

    response.status = 200;
    response.body = {
      message: `Book ${title} Sucessfully Updated`,
      bookToBeUpdated,
    };

    return;
  }

  /** If No Book Was Found Returns */
  response.status = 400;
  response.body = {
    message: `Book With ID ${params.id} Was Not Found On Book List`,
  };
};

export { getBooks, getBook, addBook, removeBook, updateBook };
