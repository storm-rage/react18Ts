import { fromJS } from "immutable";
import { GETCATEGORIES, CLEARALL, GETAUTHORNEWS } from "./contant";

const defaultState: any = fromJS({
  categories: [],
  authorNews: [],
});

interface TAction {
  type: string;
  categories: any;
  authorNews: any;
}

function reducer(state = defaultState, action: TAction) {
  const { type, categories, authorNews } = action;
  switch (type) {
    case GETCATEGORIES:
      return state.set("categories", categories);
    case GETAUTHORNEWS:
      return state.set("authorNews", authorNews);
    case CLEARALL:
      return state.set("categories", []).set("authorNews", []);
    default:
      return state;
  }
}

export default reducer;
