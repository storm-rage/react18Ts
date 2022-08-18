import request from "../index";

interface TItem {
  id: number;
  rights: any;
}

export function getRoles() {
  return request({
    url: "/roles",
  });
}

export function deleteRights(id: number) {
  return request({
    url: `/roles/${id}`,
    method: "delete",
  });
}

export function patchRights(item: TItem) {
  return request({
    url: `/roles/${item.id}`,
    method: "patch",
    data: {
      rights: item.rights,
    },
  });
}
