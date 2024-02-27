<template>
  <q-layout view="lHh Lpr lFf">
    <AcessAreaHeader />
    <q-page-container>
      <div>
        <CardShow />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import CardShow from "../components/CardPropertyShow.vue";
import AcessAreaHeader from "../components/AcessAreaHeader.vue";
export default {
  components: {
    CardShow,
    AcessAreaHeader,
  },
  methods: {
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
