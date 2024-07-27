<template>
  <q-layout view="lHh Lpr lFf">
    <AcessAreaHeader />
    <q-page-container>
      <div>
        <CardProperty  />xwxw
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import CardProperty from "../components/CardProperty.vue";
import AcessAreaHeader from "../components/AcessAreaHeader.vue";
export default {
  components: {
    CardProperty,
    AcessAreaHeader,
  },
  methods: {
    showLoginDialog() {
      console.log("Botão de login clicado!");
    },
  },
};
</script>

<style scoped>
.bg-brand {
  background: #010326;
}

.my-card {
  width: 300px;
}
</style>
