<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>
<script>
import MainLayout from './layouts/MainLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
export default {
  name: 'App',
  components: {
    MainLayout,
    AuthLayout
  },
  computed: {
    layout() {
      return this.$route.meta.layout == 'main' ? 'MainLayout' : 'AuthLayout'
    }
  }
}
</script>