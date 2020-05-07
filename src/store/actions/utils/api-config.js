let api_url = "http://localhost:8080/api";

if (process.env.NODE_ENV === "production") {
  api_url = "https://tasklistt-api.herokuapp.com/api";
}

export const API_ROOT = api_url;
