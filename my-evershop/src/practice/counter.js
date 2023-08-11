import  {CounterContext}  from "./counterReducer";


function Counter(){
    
    const value = useContext(CounterContext)
    return(<>
    <div>
        <button onClick={value.increment} > Increment </button>
        <button > {value.count}</button>
        <button onClick={value.decrement} > Decrement </button>
    </div>
    </>)
}

export default Counter;