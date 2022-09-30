import request from "../index";

export function getAllNews() {
  return request({
    url: "/news?publishState=2&_expand=category",
  });
}

export function patchStarNewsAdd(id: number, data: any) {
  return request({
    url: `/news/${id}`,
    method: "patch",
    data,
  });
}
