<template>
  <q-page class="flex flex-center" >
    <CardList  />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CardList from "../components/MyCardProperty.vue";
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
