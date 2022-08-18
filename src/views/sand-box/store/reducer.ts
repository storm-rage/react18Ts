import { fromJS } from "immutable";

const defaultState: any = fromJS({
  isLoading: false,
});

interface TAction {
  type: string;
  isLoading: boolean;
}

function reducer(state = defaultState, action: TAction) {
  const { type, isLoading } = action;
  switch (type) {
    case "setLoading":
      return state.set("isLoading", isLoading);
    default:
      return state;
  }
}

export default reducer;
