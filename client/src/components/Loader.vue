<template>
  <div class="loader">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Loader',
}
</script>
<style scoped>
.loader {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  z-index: 999;
}
.spinner-border {
  width: 100px;
  height: 100px;
}
</style>