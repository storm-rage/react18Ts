import request from "../index";

interface TItem {
  id: number;
  grade: number;
  pagepermisson: number;
}

export function deleteRights(item: TItem) {
  return request({
    url: `/${item.grade === 1 ? "rights" : "children"}/${item.id}`,
    method: "delete",
  });
}

export function patchRights(item: TItem) {
  return request({
    url: `/${item.grade === 1 ? "rights" : "children"}/${item.id}`,
    method: "patch",
    data: {
      pagepermisson: item.pagepermisson,
    },
  });
}
