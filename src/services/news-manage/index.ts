import request from "../index";

export function getCategories() {
  return request({
    url: "/categories",
  });
}

export function postNews(data: any) {
  return request({
    url: "/news",
    method: "post",
    data,
  });
}

export function deleteNews(id: number) {
  return request({
    url: `/news/${id}`,
    method: "delete",
  });
}

export function deleteCategories(id: number) {
  return request({
    url: `/categories/${id}`,
    method: "delete",
  });
}

export function patchNews(data: any) {
  return request({
    url: `/news/${data.id}`,
    method: "patch",
    data,
  });
}
export function patchCategories(data: any) {
  return request({
    url: `/categories/${data.id}`,
    method: "patch",
    data,
  });
}

export function getAuthorNews(username: string) {
  return request({
    url: `/news?author=${username}&auditState=0&_expand=category`,
  });
}

export function getPreview(id: number) {
  return request({
    url: `/news/${id}?_expand=category&_expand=role`,
  });
}
