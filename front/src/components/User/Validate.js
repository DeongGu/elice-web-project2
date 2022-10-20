export const Validate = {
  email: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  nickname: /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/,
  password: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,}$/,
};
