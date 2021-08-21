import  ACTIONS from "./todos-with-addReduser"

export default function Todo({id, complete, text, dispatch}){
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