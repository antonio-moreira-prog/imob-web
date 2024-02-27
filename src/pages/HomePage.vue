<template>
  <q-layout view="lHh Lpr lFf">
    <AcessAreaHeader />
    <q-page-container>
      <div>
        <CardList />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import CardList from "../components/CardProperty.vue";
import AcessAreaHeader from "../components/AcessAreaHeader.vue";
export default {
  components: {
    CardList,
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
