<template class="bg-brand">
  <q-page class="flex flex-center bg-brand  text-white" padding>
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
  background: #15141b;
}

.my-card {
  width: 300px;
}
</style>
