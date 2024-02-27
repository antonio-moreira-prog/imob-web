import { useQuasar } from 'quasar';

export default {
  async auth(to, from, next) {
    const $q = useQuasar();
    const token = $q.cookies.get('_myapp_token');


    if (!token || token === '' || token === 'undefined') {
      return next('/login');
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        return next('/login');
      }

      next();
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      next('/login');
    }
  }
}

