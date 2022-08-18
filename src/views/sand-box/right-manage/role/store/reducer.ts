import { fromJS } from "immutable";
import { GETROLES, CLEARALL } from "./contant";

const defaultState: any = fromJS({
  roles: [],
});

interface TAction {
  type: string;
  roles: any;
}

function reducer(state = defaultState, action: TAction) {
  const { type, roles } = action;
  switch (type) {
    case GETROLES:
      return state.set("roles", roles);
    case CLEARALL:
      return state.set("roles", []);
    default:
      return state;
  }
}

export default reducer;
