import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoBoard from "./components/TodoBoard";
import api from "./utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const isAuthenticated = true; 

  const getTask = async () => {
    try {
      const response = await api.get('/tasks');
      setTodoList(response.data.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isComplete: false
      });
      if (response.status === 200) {
        setTodoValue("");
        getTask();
      } else {
        throw new Error('Task cannot be added');
      }
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const delTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTask();
      } else {
        throw new Error('Task cannot be deleted');
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const putTask = async (id, currentIsComplete) => {
    try {
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !currentIsComplete
      });
      
      if (response.status === 200) {
        setTodoList(prevList => 
          prevList.map(item => 
            item._id === id ? { ...item, isComplete: !item.isComplete } : item
          )
        );
      } else {
        throw new Error('Task cannot be updated');
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };


  useEffect(() => {
    getTask(); 
  }, []);

  return (
    <Router>
      <Container>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <Row className="add-item-row">
                  <Col xs={12} sm={10}>
                    <input
                      type="text"
                      placeholder="할일을 입력하세요"
                      className="input-box"
                      value={todoValue}
                      onChange={(event) => setTodoValue(event.target.value)}
                    />
                  </Col>
                  <Col xs={12} sm={2}>
                    <button className="button-add" onClick={addTask}>추가</button>
                  </Col>
                </Row>
                <TodoBoard todoList={todoList} delTask={delTask} putTask={putTask} />
              </>
            } 
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
