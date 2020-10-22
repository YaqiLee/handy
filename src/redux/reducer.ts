import { LOGIN } from "./action";

var initState = {
  user: "",
};

export default function reducer(state = initState, action: any) {
  switch (action.type) {
    case LOGIN:
      return state;
    default:
      return state;
  }
}
