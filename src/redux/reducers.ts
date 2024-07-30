import { ADD_BOOK, UPDATE_BOOK, DELETE_BOOK, Book } from './actions';

interface State {
    books: Book[];
}

const initialState: State = {
    books: JSON.parse(localStorage.getItem('books') || '[]')
};

const saveToLocalStorage = (books: Book[]) => {
    localStorage.setItem('books', JSON.stringify(books));
}

export const bookReducer = (state = initialState, action: any): State => {
    switch (action.type) {
        case ADD_BOOK:
            const addedBooks = [...state.books, action.payload];
            saveToLocalStorage(addedBooks);
            return { ...state, books: [...state.books, action.payload] };
        case UPDATE_BOOK:
            const updatedBooks = state.books.map(book => book.id === action.payload.id ? action.payload : book)
            saveToLocalStorage(updatedBooks);
            return {
                ...state,
                books: state.books.map(book => book.id === action.payload.id ? action.payload : book)
            };
        case DELETE_BOOK:
            const filteredBooks = state.books.filter(book => book.id !== action.payload);
            saveToLocalStorage(filteredBooks);
            return {
                ...state,
                books: state.books.filter(book => book.id !== action.payload)
            };
        default:
            return state;
    }
};
