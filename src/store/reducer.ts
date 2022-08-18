import { combineReducers } from "redux";

import { reducer as loginReducer } from "views/login/store";
import { reducer as SandReducer } from "views/sand-box/store";
import { reducer as RoleReducer } from "views/sand-box/right-manage/role/store";
import { reducer as UserReducer } from "views/sand-box/user-manage/store";
import { reducer as NewsReducer } from "views/sand-box/news-manage/store";
import { reducer as AuditReducer } from "views/sand-box/audit-manage/store";
import { reducer as PubilshReducer } from "views/sand-box/publish-manage/store";

const Reducer = combineReducers({
  login: loginReducer,
  sand: SandReducer,
  role: RoleReducer,
  user: UserReducer,
  news: NewsReducer,
  audit: AuditReducer,
  publish: PubilshReducer,
});

export default Reducer;
