import request from "../index";

export function getSideMenus() {
  return request({
    url: "/rights?_embed=children",
  });
}
