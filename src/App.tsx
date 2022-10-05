import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { AddTodo, AllTodos } from './pages';

function App() {
  return (
    <div className="gradient-background">
      <Routes>
        <Route path="/" element={<AllTodos />} />
        <Route path="/add" element={<AddTodo />} />
      </Routes>
    </div>
  );
}

export default App;
