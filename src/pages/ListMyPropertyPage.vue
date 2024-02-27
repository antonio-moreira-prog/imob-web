<template>
  <q-page class="flex flex-center">
    <CardList />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CardList from "../components/CardProperty.vue";
export default defineComponent({
  name: 'DashboardPage'
,
  components: {
    CardList
  }
})


</script>

<style scoped>
.bg-brand {
  background: #010326;
}

.my-card {
  width: 300px;
}
</style>
