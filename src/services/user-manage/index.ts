import request from "../index";

interface TItem {
  id: number;
  roleState: boolean;
}

export function getUsers() {
  return request({
    url: "/users?_expand=role",
  });
}

export function getRegions() {
  return request({
    url: "/regions",
  });
}

export function deleteUsers(id: number) {
  return request({
    url: `/users/${id}`,
    method: "delete",
  });
}

export function patchUsers(id: number, item: any) {
  return request({
    url: `/users/${id}`,
    method: "patch",
    data: item,
  });
}

export function postUsers(item: TItem) {
  return request({
    url: `/users`,
    method: "post",
    data: { ...item, roleState: true, default: false },
  });
}
