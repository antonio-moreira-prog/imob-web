/* eslint-disable no-param-reassign */
import axios from "axios";
import { useQuasar } from 'quasar';
import { $toast } from "vuetify-snackbar-toast";
import { useRouter } from 'quasar';

function getToken() {
  const cookieList = document.cookie.split(";").filter((str) => str.includes("csrftoken"));
  if (cookieList.length > 0) {
    const cookie = cookieList[0].replace("csrftoken=", "").trim();
    return cookie;
  }
  return null;
}

export default () => {
  const $q = useQuasar();
  const $router = useRouter();
  const myAppToken = $q.cookies.get('_myapp_token');
  const requestConfig = { baseURL: process.env.VUE_APP_API_HOST };
  const customInstance = axios.create(requestConfig);

  customInstance.interceptors.request.use((config) => {
    if (myAppToken) config.headers.Authorization = `Bearer ${myAppToken}`;
    const csrfToken = getToken();
    if (csrfToken) config.headers["X-CSRF-TOKEN"] = csrfToken;
    return config;
  });

  customInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401 && myAppToken) {
        $toast.warn("Sua sessão expirou");
        const currentRouteName = $router.currentRoute.name;
        if (currentRouteName !== "login" && currentRouteName !== "logout") {
          $router.push({ name: "logout" });
        }
        return Promise.reject(new Error("Sua sessão expirou"));
      }
      if (error.response && error.response.status === 403) {
        return Promise.reject(new Error("Você não tem permissão para acessar esse recurso"));
      }
      if (error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  );

  return customInstance;
};
