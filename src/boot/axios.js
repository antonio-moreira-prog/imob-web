import { boot } from 'quasar/wrappers';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router'; // Certifique-se de instalar e importar do 'vue-router'

// Função para obter o token CSRF
function getCsrfToken() {
  const cookieList = document.cookie.split(";").filter((str) => str.includes("csrftoken"));
  if (cookieList.length > 0) {
    const cookie = cookieList[0].replace("csrftoken=", "").trim();
    return cookie;
  }
  return null;
}

export default boot(({ app }) => {
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
        $q.notify({
          type: 'warning',
          message: 'Sua sessão expirou'
        });
        const currentRouteName = $router.currentRoute.value.name; // Para Vue Router 4
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

  // Configurar propriedades globais
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = customInstance;

  return customInstance;
});
