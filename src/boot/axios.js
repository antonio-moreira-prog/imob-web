import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
// const api = axios.create({ baseURL: 'https://api.example.com' })

// export default boot(({ app }) => {
//   // for use inside Vue files (Options API) through this.$axios and this.$api

//   app.config.globalProperties.$axios = axios
//   // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
//   //       so you won't necessarily have to import axios in each vue file

//   app.config.globalProperties.$api = api
//   // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
//   //       so you can easily perform requests against your app's API
// })

// export { api }

/* eslint-disable no-param-reassign */
import { useQuasar } from 'quasar';
// import { $toast } from "vuetify-snackbar-toast";

function getCsrfToken() {
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
    const csrfToken = getCsrfToken();
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
