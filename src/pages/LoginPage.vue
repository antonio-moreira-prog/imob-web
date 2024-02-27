<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="q-gutter-md">
      <q-page class="flex flex-center bg-dark-blue">
        <q-card class="shadow-2 my_card" bordered >
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">Entrar</div>
            <div class="text-grey-8" >
              Faça login abaixo para acessar sua conta
            </div>
          </q-card-section>
          <q-card-section>
            {{  form }}
            <q-input
              v-model="email"
              type="email"
              label="Email"
              dense
              outlined
              ></q-input>

            <q-input
              class="q-mt-md"
              type="password"
              label="Senha"
              v-model="password"
              dense
              outlined
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px; padding: 2% 0 2% 0; font-size: 14pt;"
              color="brand"
              rounded
              size="md"
              label="Entrar"
              @click="login"
              class="full-width q-mb-md"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Não tem uma conta ainda?
              <a
                href="signup"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
              >Inscrever-se.</a>
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
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


    // if($q.cookies.has('_myapp_token')){
    //   $q.cookies.remove('_myapp_token'); //Para remover o cookie
    // }


    const login = () => {
      const payload = {
        email: email.value,
        password: password.value
      };


      // if (email.value === '' || password.value === '') {
      //   $q.notify({
      //     color: 'negative',
      //     message: 'Por favor, preencha todos os campos.'
      //   });
      //   return;
      // }

      fetch(`http://127.0.0.1:8000/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(res => {
        $q.cookies.set('_myapp_token', res.access_token, { expires: 1 }); // Cookie de 1 dia
      });
      router.push('/dashboard');
    };

    return {
      email,
      password,
      login
    };
  }
});
</script>

<style scoped>
.my_card {
  max-width: 25rem;
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
.bg-dark-blue {
  background-color: #1976D2;
}
.bg-brand {
  background: #010326;
}


@media (min-width: 0px) and (max-width: 600px) {
  .my_card {
    max-width: 90%;
  }
}
</style>
