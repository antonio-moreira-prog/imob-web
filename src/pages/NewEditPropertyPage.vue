<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="my-card">
      <q-page-section class="text-align-center">
        <q-card-title class="text-h5">{{ editMode ? 'Editar' : 'Cadastrar' }}Imóvel</q-card-title>
      </q-page-section>
      <q-page-section>
        <!-- @submit.prevent="submitForm" -->
        <q-form @submit="createProperty" form-data>
          <q-input standout="bg-primary text-white" v-model="novoImovel.title" label="Título" class="q-mb-md" />
          <q-input standout="bg-primary text-white" v-model="novoImovel.address" label="Endereço" class="q-mb-md" />
          <q-input standout="bg-primary text-white" v-model="novoImovel.price" label="Preço" class="q-mb-md" />
          <q-input standout="bg-primary text-white" v-model="novoImovel.area" label="Área m&#x00B2;" class="q-mb-md" />
          <q-input standout="bg-primary text-white" v-model="novoImovel.bedrooms" label="Quartos" class="q-mb-md" />
          <q-input standout="bg-primary text-white" v-model="novoImovel.bathrooms" label="Banheiros" class="q-mb-md" />
          <q-input standout="bg-primary text-white" v-model="novoImovel.description" label="Descrição" class="q-mb-md" />
          <q-input standout="bg-primary text-white" v-model="novoImovel.city" label="Cidade" class="q-mb-md" />
          <q-input standout="bg-primary text-white" v-model="novoImovel.state" label="Estado" class="q-mb-md" />
          <q-input standout="bg-primary text-white" v-model="novoImovel.zip" :mask="'#####-###'" label="CEP" class="q-mb-md" />
          <q-uploader
            accept="image/*"
            label="Selecione uma imagem"
            v-model="novoImovel.image"
            class="q-mb-md"
            :max-files="1"
            :multiple-accept="false"
          />
          <q-btn class="full-width q-mb-md btn-custom" size="md" color="brand" type="submit" label="Cadastrar Imóvel" />

        </q-form>
      </q-page-section>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from "axios";
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default {
  name: "newEditProperty",
  setup() {
    const $q = useQuasar();

    return { $q };
  },

  data() {
    return {
      editMode: false,
      result: [],
      novoImovel: {
        title: "",
        address: "",
        price: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        description: "",
        city: "",
        state: "",
        zip: "",
        image: null,
      },
    };
  },
  created() {
    this.PropertyLoad();

  },
  mounted() {
    console.log("mounted() called...");
  },
  methods: {

    async createProperty() {
      // pegar cookies

      const token = this.$q.cookies.get('_myapp_token');
      // console.log(token);
      try {
        var page = "http://localhost:8000/api/edit/property";

        const response = await axios.post(page, this.novoImovel, {
          method: 'POST',
          headers: {
            Authorization:  'Bearer ' +  token,
            'Content-Type': 'application/json'
          }
        });


        // console.log(response);
        this.PropertyLoad();
        this.clearFields();
        alert("Propriedade criada");
      } catch (error) {
        console.log(error);
      }
    },
    clearFields() {
      this.novoImovel.title = "";
      this.novoImovel.address = "";
      this.novoImovel.price = "";
      this.novoImovel.area = "";
      this.novoImovel.bedrooms = "";
      this.novoImovel.bathrooms = "";
      this.novoImovel.description = "";
      this.novoImovel.city = "";
      this.novoImovel.state = "";
      this.novoImovel.zip = "";
      this.novoImovel.image = null;
    },
    async PropertyLoad() {
      const token = this.$q.cookies.get('_myapp_token');
      const propertyId = this.$route.params.id;
      const page = "http://localhost:8000/api/edit/property/" + propertyId;





      axios.get(page, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      // console.log(response.data);
      this.novoImovel.title = response.data.title;
      this.novoImovel.address = response.data.address;
      this.novoImovel.price = response.data.price;
      this.novoImovel.area = response.data.area;
      this.novoImovel.bedrooms = response.data.bedrooms;
      this.novoImovel.bathrooms = response.data.bathrooms;
      this.novoImovel.description = response.data.description;
      this.novoImovel.city = response.data.city;
      this.novoImovel.state = response.data.state;
      this.novoImovel.zip = response.data.zip;
      this.novoImovel.image = response.data.image;
    })
    .catch(error => {
      console.error('Erro ao carregar dados do imóvel:', error);
    });




    },
  },
};
</script>


<style scoped>
.bg-brand {
  background: #010326;
}
.btn-custom {
  border-radius: 8px;
  padding: 2%;
  font-size: 10pt;
}

.my-card {
  width: auto;
  max-width: 800px;
  margin: 1rem auto;
  box-shadow: none;
}

@media (max-width: 576px) {
  .my-card {
    width: 90%;
  }
  .btn-custom {
    border-radius: 8px;
    padding: 2%;
    font-size: 10pt;
    padding: 5%;
  }
}
</style>
