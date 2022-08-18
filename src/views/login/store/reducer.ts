import { fromJS } from "immutable";
import { INITSIDEMENUS, UPDATUSERS, LOGINOUT, UPDATROUTES } from "./contant";

const defaultState: any = {
  count: 990,
  menus: [],
  users: {},
  routes: [],
};

interface TAction {
  type: string;
  menus: any;
  users: any;
  routes: any;
}

function reducer(state = defaultState, action: TAction) {
  const { type, menus, users, routes } = action;
  let mapObj: any = fromJS(state); // **
  switch (type) {
    case INITSIDEMENUS:
      return mapObj.set("menus", menus).toJS();
    case UPDATUSERS:
      return mapObj.set("users", users).toJS();
    case UPDATROUTES:
      return mapObj.set("routes", routes).toJS();
    case LOGINOUT:
      return mapObj.set("users", {}).set("menus", []).set("routes", []).toJS();
    default:
      return state;
  }
}

export default reducer;
