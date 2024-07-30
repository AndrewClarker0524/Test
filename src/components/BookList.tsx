import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Book, deleteBook } from '../redux/actions';
import BookForm from './BookForm';

interface State {
    books: Book[];
}

const BookList: React.FC = () => {
    const books = useSelector((state: State) => state.books);
    const dispatch = useDispatch();
    const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [sortCriteria, setSortCriteria] = useState<string>('name');
    const [searchTerm, setSearchTerm] = useState<string>('');


    const handleAdd = () => {
        setSelectedBook(null);
        setShowForm(true);
    };

    const handleEdit = (book: Book) => {
        setSelectedBook(book);
        setShowForm(true);
    };

    const handleCheckboxChange = (id: number) => {
        setSelectedBooks(prevSelectedBooks =>
            prevSelectedBooks.includes(id)
                ? prevSelectedBooks.filter(bookId => bookId !== id)
                : [...prevSelectedBooks, id]
        );
    };

    const handleBulkDelete = () => {
        selectedBooks.forEach(bookId => dispatch(deleteBook(bookId)));
        setSelectedBooks([]);
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortCriteria(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    const sortedBooks = [...books].sort((a, b) => {
        if (sortCriteria === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortCriteria === 'price') {
            return a.price - b.price;
        } else if (sortCriteria === 'category') {
            return a.category.localeCompare(b.category);
        }
        return 0;
    });

    const filteredBooks = sortedBooks.filter(book =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className='menu'>

                <button onClick={handleAdd}>Add Book</button>
                <button onClick={handleBulkDelete} disabled={selectedBooks.length === 0}>
                    Delete Selected
                </button>
                <select value={sortCriteria} onChange={handleSortChange}>
                    <option value="name">Sort by Name</option>
                    <option value="price">Sort by Price</option>
                    <option value="category">Sort by Category</option>
                </select>
                <input
                    type='text'
                    placeholder='Search by name'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className='inputSearch'
                />
            </div>
            <ul>
                {filteredBooks.map(book => (
                    <li key={book.id} className='bookList'>
                        <div className='bookDetail'>

                            <div>

                                {book.name} - ${book.price} - {book.category}
                            </div>
                            <div className='inputCheck'>

                                <button onClick={() => handleEdit(book)}>Edit</button>
                                <input
                                    className='inputCheckbox'
                                    type="checkbox"
                                    checked={selectedBooks.includes(book.id)}
                                    onChange={() => handleCheckboxChange(book.id)}
                                />
                            </div>
                        </div>
                        <hr />
                    </li>
                ))}
            </ul>
            {showForm && <BookForm book={selectedBook} onClose={() => setShowForm(false)} />}
        </div>
    );
};

export default BookList;
