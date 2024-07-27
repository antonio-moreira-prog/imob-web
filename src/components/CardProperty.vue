<template>
  <div class="q-pa-md q-gutter-md row items-start justify-center justify-sm-start ">
    <q-card  class="my-card col-xs-12 col-sm-6 col-md-4 bg-custom" flat bordered  v-for="property in properties" :key="property.id" >
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
      <q-card-actions vertical >
        <q-btn style="border-radius: 8px; padding: 2% 0 2% 0; font-size: 14pt;" color="brand" @click="$router.push('/property/' + property.id)">Ver</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CardProperty',
  data() {
    return {
      properties: []
    }
  },
  created() {
    this.fetchProperties();
  },
  methods: {
    async fetchProperties() {
      const token = this.$q.cookies.get('_myapp_token');
      try {
        const response = await axios.get('http://localhost:8000/api/listmyproperty');
        this.properties = response.data;
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    }
  }
};
</script>

<style scoped>
.bg-brand {
  background: #1b9468;
}
.bg-custom{
  background: #29263c;
  color: white;
  border-radius: 10px;
}
.min-height-card {
  min-height: 900px;
  min-width: 500px;
}
q-img{
  height: 200px;
  width: 100%;
}
</style>
