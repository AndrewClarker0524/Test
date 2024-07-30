import React from 'react';
import BookList from './components/BookList';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Dear Tester, Welcome to BookStore!</h1>
      <BookList />
    </div>
  );
};

export default App;
