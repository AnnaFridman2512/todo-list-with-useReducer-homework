
import { useReducer, useState } from 'react';

//8.Setting all types in one variable
const ACTIONS = {
    ADD_TODO: 'add-todo',
    TOGGLE_COMPLETE: 'toggle-complete'
  
  }
  
   //10.Define the "reducer" function. It should know how to update the "state" acordinly, depending on the request that it got, and return the changed state
  function reducer(state, action) {//The "action" we got from step 9 {type: ACTIONS.ADD_TODO} and step 12 (type: ACTIONS.MARK_COMPLETE)
    switch (action.type) {//switch case by the action.type thats or "'add-todo'" or "toggle-complete"
      case ACTIONS.ADD_TODO:      
        return{
          ...state,//Bring me all the todos that already exist, put them in an object,we will overide its value with setting "todos:" next:
          todos: [...state.todos, {//then distructure them to a new array, and add the new todo to it:
            id:Date.now(), //each todo object will have 3 keys - "id" "comlete" and "text"       
           complete:false,        
           text: action.payload.text //the value of "text" is the text of the added todo
          }]
        };
     //14.Take care of the second case: 
       case ACTIONS.TOGGLE_COMPLETE: 
         return{
             ...state,
            todos: state.todos.map(todo => todo.id === action.payload.id
            ? {...todo, complete: !todo.complete} 
            : todo
            )
       };
      default:
        return state;
    }
  }
  
  export default function Todos() {
    //6.Define the state of the input value
    const [text, setText] = useState('');

    //1.Define the state you want to manage
    const [state, dispatch] = useReducer(reducer, {todos: []});//const [state, dispatch] = useReducer(reducer, todos: [] is-initialState)
    //"dispatch" function is like "setCount"
    // const  [todos, setTodos] = useState('');
    //The "initialState" is an object that contains all the states - in our case it's only one 
    //but can look like this: const [count, dispatch] = useReducer(reducer, {count:0, todos: []});
    //"state" contains {todos: []} object 
    
    //2.Get the "todos" object from state  
    const {todos} = state;      

    
    //5.Write the handleSubmit function
    const handleSubmit = (e) => {
      e.preventDefault();
      //9.Setting  "dispatch" functions that calls "reducer"
      dispatch({type: ACTIONS.ADD_TODO,//"dispatch" receives an object that is going to be the value of "action" - in step 10
      //"action" is an object that has a "type" key and "payload" key
     //"type" value is a string that describes the action that i want to execute (ADD_TODO: 'add-todo')                          
              payload: {text}   //"payload" value is what i execute the action on, in this case it's the text from todo object from input
      });
      setText('');
    }
  
    return (
      <>

        <div className='todos'>
        {/*3.Define what you want to return, first without the input*/}
        <form onSubmit={handleSubmit}>{/*4.Define what happens when the form is sent */}
          <input type="text" value={text} onChange={(e) => setText(e.target.value)}></input>{/*7.(e) => setText(e.target.value)- take the value of the target that the event was executed on and setTest */}
          <button>SUBMIT</button>
          </form>
          <ul>
          {todos.map(todo => <Todo id={todo.id} complete={todo.complete} text={todo.text} dispatch={dispatch} key={todo.id}/>)}
          </ul>
        </div>
  
      </>
    );
  }

    export function Todo({id, complete, text, dispatch}){
          return(

            <li>          
              <a style={complete ? {'textDecoration' : 'line-through'} : {}} href={'#'} onClick={() => 
          
              dispatch({
                type: ACTIONS.TOGGLE_COMPLETE,
                 payload: {id}
                })
                }>
                    {text}
              </a>
              
            </li>
          )
      }
  
  