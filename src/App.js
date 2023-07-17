import React, { useReducer, useState } from "react";
import TodoList, {ACTION as ACTION} from "./components/TodoList";

//used to make new ids
let count = 0;

function reducer(state, action) {
  switch (action.type) {
    case ACTION.TOGGLE_EDIT: 
    {
      const index = state.findIndex(toDo => toDo.id === action.payload.id);
      const toDoCopy = {
        ...state[index],
        editing: !state[index].editing
      }
      const toDosCopy = state.slice();
      toDosCopy.splice(index, 1, toDoCopy);
      return toDosCopy;
    }
    case ACTION.SAVE:
      {
        const index = state.findIndex(toDo => toDo.id === action.payload[0].id);
        const toDoCopy = {
          ...state[index],
          task: action.payload[1],
          editing: !state[index].editing
        }
        const toDosCopy = state.slice();
        toDosCopy.splice(index, 1, toDoCopy);
        return toDosCopy;
      }
    case ACTION.NEW_USER_INPUT:
    {
      count++;
      return [{
        id: count,
        checked: false,
        task: action.payload
      }, ...state];
    }
    case ACTION.DELETE:
    {
      const index = state.findIndex(toDo => toDo.id === action.payload.id);
      const toDosCopy = state.slice();
      toDosCopy.splice(index, 1);
      return toDosCopy;
    }
    case ACTION.CHECK:
    {
      const index = state.findIndex(toDo => toDo.id === action.payload.id);
      const toDoCopy = {
        ...state[index],
        checked: !state[index].checked
      }
      const toDosCopy = state.slice();
      toDosCopy.splice(index, 1, toDoCopy);
      return toDosCopy;
    }
    default:
      return state;
  }

}

function App() {

  const [data, dispatch] = useReducer(reducer, []);
  const [userInput, setUserInput] = useState('');

  const handleChange = (e) => {
    setUserInput(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({type: ACTION.NEW_USER_INPUT, payload: userInput});
    setUserInput('');
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input value={userInput} type="text" onChange={handleChange} placeholder="Add Task" />
        <button>Add Todo</button>
      </form>
      <TodoList 
        data={data}
        dispatch={dispatch}
      />

    </div>
  );
}




export default App;
