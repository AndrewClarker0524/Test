export const ADD_BOOK = 'ADD_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';
export const DELETE_BOOK = 'DELETE_BOOK';

export interface Book {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
}

export const addBook = (book: Book) => ({
  type: ADD_BOOK,
  payload: book
});

export const updateBook = (book: Book) => ({
  type: UPDATE_BOOK,
  payload: book
});

export const deleteBook = (id: number) => ({
  type: DELETE_BOOK,
  payload: id
});
