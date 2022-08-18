import request from "../index";

export function getAuthorPubilshNews(username: string, type: number) {
  return request({
    url: `/news?author=${username}&publishState=${type}&_expand=category`,
  });
}
