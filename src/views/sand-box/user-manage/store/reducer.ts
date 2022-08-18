import { fromJS } from "immutable";
import { GETUSERS, GETREGIONS, CLEARALL } from "./contant";

const defaultState: any = fromJS({
  users: [],
  regions: [],
});

interface TAction {
  type: string;
  users: any;
  regions: any;
}

function reducer(state = defaultState, action: TAction) {
  const { type, users, regions } = action;
  switch (type) {
    case GETUSERS:
      return state.set("users", users);
    case GETREGIONS:
      return state.set("regions", regions);
    case CLEARALL:
      return state.set("regions", []).set("users", []);
    default:
      return state;
  }
}

export default reducer;
