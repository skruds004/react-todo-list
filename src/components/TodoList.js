import React, { useState } from 'react'


export const ACTION = {
  TOGGLE_EDIT: "toggleEdit",
  NEW_USER_INPUT: "newUserInput",
  DELETE: "delete",
  CHECK: "check",
  SAVE: "save",
  //CHANGE: "change"
}

export default function TodoList({data, dispatch}) {  

  return (
        <ul className="TodoList">
          {data.map(toDo => {
            return (
              <Todo
                key={toDo.id}
                toDo={toDo}
                dispatch={dispatch}
              />
            )
          })}
        </ul>
  )
}

function Todo({toDo, dispatch}) {

  const [userInput, setUserInput] = useState(toDo.task);

  const handleChange = (e) => {
    setUserInput(e.target.value);
  }

  if(!toDo.editing) {
    return (
      <li>
          <input type="checkbox" checked={toDo.checked} onChange={() => dispatch({type: ACTION.CHECK, payload: toDo})}/>
          <p>{toDo.task}</p>
          <button type="button" className="edit" onClick={() => dispatch({type: ACTION.TOGGLE_EDIT, payload: toDo})}>Edit</button>
          <button type="button" className="delete" onClick={() => dispatch({type: ACTION.DELETE, payload: toDo})}>Delete</button>
      </li>
    );
  }
  else {
    return (
      <li>
        <form onSubmit={() => dispatch({type: ACTION.SAVE, payload: [toDo, userInput]})}>
          <input value={userInput} type="text" onChange={handleChange} />
          <button type="submit">Save</button>
        </form>
      </li>
    );
  }
}
