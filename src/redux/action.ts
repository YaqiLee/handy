export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export function login(username: string, password: string) {
  return {
    type: LOGIN,
    payload: { username, password },
  };
}
