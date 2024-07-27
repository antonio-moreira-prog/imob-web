<template>
  <div class="q-pa-md q-gutter-md row items-start justify-center justify-sm-start">
    <q-card class="my-card col-xs-12 col-sm-10" flat bordered>
      <q-card-section horizontal class="row">
        <q-img
          class="col-8"
          src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <CarouselSlide />
        <q-card-section class="col-4">
          <div class="text-h6 ellipsis">
            {{ property.title }}
          </div>
          <div class="text-subtitle1">
            R$ {{ property.price }}
          </div>
          <div class="text-caption text-grey">
            {{ property.description }}
          </div>
          <div class="text-caption text-grey">
            {{ property.rooms }} quartos, {{ property.bathrooms }} banheiros
          </div>
          <q-card-actions style="margin-top: 100%;" vertical class="col-12 q-mt-md q-gutter-md q-mt-lg q-mt-xl">
            <q-btn style="border-radius: 8px; padding: 2% 0 2% 0; font-size: 14pt;" color="brand" @click="$router.push('/property/' + property.id)">Alugar</q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card-section>
      <q-separator />
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import CarouselSlide from "../components/CarouselSlide.vue";
import axios from 'axios';

export default {
  name: 'PropertyDetails',
  components: {
    CarouselSlide
  },
  data() {
    return {
      property: {}
    }
  },
  created() {
    this.fetchPropertyDetails();
  },
  methods: {
    async fetchPropertyDetails() {
      const propertyId = this.$route.params.id;
      // console.log("Show");
      try {
        const response = await axios.get(`http://localhost:8000/api/property/${propertyId}`);
        this.property = response.data;
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    }
  }
};
</script>

<style scoped>
.bg-brand {
  background: #010326;
}
</style>
./CarouselSlide.vue