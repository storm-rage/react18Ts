import { fromJS } from "immutable";
import {
  GETAUTHOUPPUBLISHRNEWS,
  CLEARALL,
  GETAUTHOPUBLISHRNEWS,
  GETAUTHORDELETESNEWS,
} from "./contant";

const defaultState: any = fromJS({
  unpublishs: [],
  publishs: [],
  deletes: [],
});

interface TAction {
  type: string;
  unpublishs: any;
  publishs: any;
  deletes: any;
}

function reducer(state = defaultState, action: TAction) {
  const { type, unpublishs, publishs, deletes } = action;
  switch (type) {
    case GETAUTHOUPPUBLISHRNEWS:
      return state.set("unpublishs", unpublishs);
    case GETAUTHOPUBLISHRNEWS:
      return state.set("publishs", publishs);
    case GETAUTHORDELETESNEWS:
      return state.set("deletes", deletes);
    case CLEARALL:
      return state.set("unpublishs", []).set("publishs", []).set("deletes", []);
    default:
      return state;
  }
}

export default reducer;
