<template>
  <div class="q-pa-md q-gutter-md row items-start justify-center justify-sm-start">
    <q-card v-for="property in userProperties" :key="property.id" class="my-card col-xs-12 col-sm-6 col-md-4" flat bordered>
      <q-img src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

      <q-card-section>
        <div class="text-h6 ellipsis">
          {{ property.title }}
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">
          R$ {{ property.price }}
        </div>
        <div class="text-caption text-grey">
          {{ property.description }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions vertical>
        <q-btn style="border-radius: 8px; padding: 2% 0 2% 0; font-size: 14pt;" color="brand" @click="$router.push('/property/' + property.id)">Ver</q-btn>
        <q-btn style="border-radius: 8px; padding: 2% 0 2% 0; font-size: 14pt;" color="primary" icon="edit" @click="$router.push('/edit/property/' + property.id)">Editar</q-btn>
        <q-btn style="border-radius: 8px; padding: 2% 0 2% 0; font-size: 14pt;" color="red" icon="delete">Deletar</q-btn>
      </q-card-actions>
    </q-card>
    <div v-if="userProperties.length === 0">
      <p>Nenhum card disponível.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyCardProperty',
  data() {
    return {
      userProperties: [],
      loggedInUserId: null
    };
  },
  created() {
    this.fetchLoggedInUserId();
  },
  methods: {
    async fetchUserProperties() {
      try {
        const response = await axios.get('http://localhost:8000/api/listmyproperty');
        this.userProperties = response.data.filter(property => property.user_id === this.loggedInUserId);
      } catch (error) {
        console.error('Erro ao buscar propriedades do usuário:', error);
      }
    },
    async fetchLoggedInUserId() {
      const token = this.$q.cookies.get('_myapp_token');
      // console.log(token);
      try {
        var page = 'http://localhost:8000/api/user';
        const response = await axios.get(page, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        });
        this.loggedInUserId = response.data.id;
        this.fetchUserProperties(); // Após obter o ID do usuário logado, buscar suas propriedades
      } catch (error) {
        console.error('Erro ao buscar o ID do usuário logado', error);
      }
    }
  },
};
</script>

<style scoped>
.bg-brand {
  background: #010326;
}
.min-height-card {
  min-height: 900px;
  min-width: 500px;
}
q-img {
  height: 200px;
  width: 100%;
}
</style>
