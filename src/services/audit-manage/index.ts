import request from "../index";

export function getAuditNews(username: string) {
  return request({
    url: `/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`,
  });
}

export function getAuditListNews() {
  return request({
    url: `/news?auditState=1&_expand=category`,
  });
}
