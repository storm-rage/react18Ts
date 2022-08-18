import { fromJS } from "immutable";
import { GETAUDITLIST, CLEARALL, GETAUDIT } from "./contant";

const defaultState: any = fromJS({
  aduitList: [],
  aduits: [],
});

interface TAction {
  type: string;
  aduitList: any;
  aduits: any;
}

function reducer(state = defaultState, action: TAction) {
  const { type, aduitList, aduits } = action;
  switch (type) {
    case GETAUDITLIST:
      return state.set("aduitList", aduitList);
    case GETAUDIT:
      return state.set("aduits", aduits);
    case CLEARALL:
      return state.set("aduitList", []).set("aduits", []);
    default:
      return state;
  }
}

export default reducer;
