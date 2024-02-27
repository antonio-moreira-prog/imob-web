<template>
  <q-header>
    <q-toolbar>
      <div class="q-ml-auto q-mr-sm">
        <q-btn style="border-radius: 8px;" @click="$router.push('/login')" color="brand">Área de acesso</q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from 'vue'
export default {
  name: 'AcessAreaHeader'
};
</script>

<style scoped>
.bg-brand {
  background: #010326;
}
</style>
