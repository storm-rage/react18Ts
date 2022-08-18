import request from "../index";

interface TUsers {
  username: string;
  password: string;
}

export function loginUser(users: TUsers) {
  return request({
    url: `/users?username=${users.username}&password=${users.password}&roleState=true&_expand=role`,
  });
}
