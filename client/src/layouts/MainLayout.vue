<template>
  <div>
    <Navbar/>
    <router-view/>
  </div>
</template>
<script>
import Navbar from '../components/Navbar.vue'
export default {
  name: 'MainLayout',
  components: {
    Navbar
  }
}
</script>