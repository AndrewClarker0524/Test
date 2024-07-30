import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook, updateBook, deleteBook, Book } from '../redux/actions';

interface BookFormProps {
  book?: Book | null;
  onClose: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ book, onClose }) => {
  const [name, setName] = useState(book ? book.name : '');
  const [price, setPrice] = useState(book ? book.price : 0);
  const [category, setCategory] = useState(book ? book.category : '');
  const [description, setDescription] = useState(book ? book.description : '');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (book) {
      dispatch(updateBook({ ...book, name, price, category, description }));
    } else {
      const newBook: Book = { id: Date.now(), name, price, category, description };
      dispatch(addBook(newBook));
    }
    onClose();
  };

  const handleDelete = () => {
    if (book) {
      dispatch(deleteBook(book.id));
      onClose();
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>{book ? 'Edit Book' : 'Add Book'}</h2>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="number" value={!price ? undefined : price}  onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
        <button onClick={handleSubmit}>{book ? 'Update' : 'Add'}</button>
        {book && <button onClick={handleDelete}>Delete</button>}
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default BookForm;
