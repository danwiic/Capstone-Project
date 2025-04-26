import AddProduct from "../components/modal/AddProduct";
import LoginModal from "../components/modal/LoginModal";
export default function Test() {


  return (
    <div className="flex gap-6 p-20 items-start relative">
     {/* <AddProduct isOpen={true} onClose={() => {}}/> */}

    </div>
  );
}

































































// import { useReducer } from "react";
// export default function Test() {
//   const [state, action] = useReducer(reducerIncrement, {
//     count: 0,
//     error: String || null,
//   });
//   return (
//     <div className="p-16 flex flex-col ">
//       <span>{state.count}</span>
//       {state.error && <span className="text-red-500">{state.error}</span>}

//       <div className="flex gap-4">
//         <button onClick={() => action({ type: "increment" })}>increment</button>
//         <button onClick={() => action({ type: "decrement" })}>decrement</button>
//         <button onClick={() => action({ type: "reset" })}>reset</button>
//       </div>
//     </div>
//   );
// }

// type State = {
//   count: number;
//   error: string | null;
// };

// type Action = {
//   type: "increment" | "decrement" | "reset";
// };

// function reducerIncrement(state: State, action: Action) {
//   const { type } = action;

//   switch (type) {
//     case "increment": {
//       const count = state.count + 1;
//       return {
//         ...state,
//         count,
//         error: null,
//       };
//     }
//     case "decrement": {
//       const count = state.count - 1;
//       const hasError = count < 0;
//       return {
//         ...state,
//         count: hasError ? state.count : count,
//         error: hasError ? "Cannot go down 0" : null,
//       };
//     }
//     case "reset":
//       return { ...state, count: (state.count = 0) };
//     default:
//       break;
//   }
// }
