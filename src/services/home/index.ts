import request from "../index";

export function getSideMenus() {
  return request({
    url: "/rights?_embed=children",
  });
}

export function getViewList() {
  return request({
    url: "/news?publishState=2&_expand=category&_sort=view&_order=desc&_limit=6",
  });
}

export function getStarList() {
  return request({
    url: "/news?publishState=2&_expand=category&_sort=star&_order=desc&_limit=6",
  });
}

export function getBarList() {
  return request({
    url: "/news?publishState=2&_expand=category",
  });
}
