<template>
  <div class="wrapper">
    <q-layout view="lHh Lpr lFf">
      <q-page-container class="q-gutter-md">
        <q-page class="flex flex-center">
          <q-card class="shadow-2 my_card" bordered >
            <q-card-section class="text-center">
              <div class="text-white text-h5 text-weight-bold text">Entrar</div>
              <div class="text-white">
                Faça login abaixo para acessar sua conta
              </div>
            </q-card-section>
            <q-card-section>
              <q-input
                color="white"
                v-model="email"
                type="email"
                label="Email"
                dense
                outlined
                >
                <template v-slot:append>
                    <q-icon
                      color="white"
                      name="email"
                      class="cursor-pointer"

                    />
                  </template>
              </q-input>

                <q-input
                  color="white"
                  dense
                  v-model="password"
                  :type="isPwd ? 'password' : 'text'"
                  class="q-mt-md"
                  label="Senha"
                  outlined
                >
                  <template v-slot:append>
                    <q-icon
                      color="white"
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
            </q-card-section>
            <q-card-section>
              <q-btn
                style="border-radius: 8px; padding: 2% 0 2% 0; font-size: 14pt;"
                color="brand"
                rounded
                size="md"
                label="Entrar"
                @click="login"
                class="full-width q-mb-md animated-button"
              ></q-btn>
            </q-card-section>
            <q-card-section class="text-center q-pt-none">
              <div class="text-grey-8">
                Não tem uma conta ainda?
                <a
                  href="signup"
                  class="text-brown-4 text-weight-bold"
                  style="text-decoration: none"
                >Inscrever-se.</a>
              </div>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default defineComponent ({
  name: 'LoginPage',
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const isPwd = ref(true);

    const login = () => {
      const payload = {
        email: email.value,
        password: password.value
      };

      fetch(`http://127.0.0.1:8000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to login');
        }
        return response.json();
      })
      .then(res => {
        $q.cookies.set('_myapp_token', res.access_token, { expires: 1 }); // Cookie de 1 dia
        router.push('/dashboard');
      })
      .catch(error => {
        console.error('Failed to login:', error);
        error.value = 'Failed to login. Please check your credentials and try again.';
      });
    };

    return {
      email,
      password,
      error,
      login,
      isPwd
    };
  }
});
</script>


<style scoped>
.my_card {
  
  max-width: 25rem;
  width: 100%;
  border-radius: 8px;
  background: transparent;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;

}

.bg-brand {
  background: #3f259e;
}
.bg-brand:hover{
  background: #5EF2BC;
  background: linear-gradient(to left, #603ddd, #1E1D26, #5EF2BC);
   background: -webkit-linear-gradient(to right, #8E72F2, #1E1D26, #5EF2BC, #F29441);
   background-size: 400% 400%;
  animation: gradientAnimation 10s normal infinite;
  -webkit-animation: gradientAnimation 10s linear infinite;
  -moz-animation: gradientAnimation 10s linear infinite;
  -o-animation: gradientAnimation 10s linear infinite;
  -ms-animation: gradientAnimation 10s linear infinite;
  animation-direction: alternate;
}

.wrapper {
  height: 100vh;
  width: 100vw;
  position: absolute;
  background: linear-gradient(135deg, #3f259e, #1E1D26, #1b9468, #a15e23);
  background-size: 800% 800%;
  animation: gradientAnimation 20s linear infinite;
}

.wrapper > .my_card{
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  max-width: 600px;
  background-color: rgba(255, 255, 255, 0);
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 50% 100%;
  }
  50% {
    background-position: 100% 50%;
  }
  75% {
    background-position: 50% 0%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media (min-width: 0px) and (max-width: 600px) {
  .my_card {
    max-width: 90%;
  }
}
</style>
