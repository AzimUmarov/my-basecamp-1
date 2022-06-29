<template>
  <div class="container form">
    <Loader v-if="loading"/>
    <div class="row h-100 justify-content-center">
      <div class="col-9 mt-5">
        <h2 class="text-center">
          New Project
        </h2>
        <form action="" @submit.prevent="submit">
          <div class="form-group">
            <label class="text-muted required" for="project_name">
              Name
            </label>
            <input class="form-control" type="text" id="project_name" v-model="title">
          </div>
          <div class="form-group">
            <label class="text-muted required" for="project_description">
              Description
            </label>
            <textarea class="form-control" id="project_description" v-model="description"></textarea>
          </div>
          <div class="text-center mt-5">
            <button class="btn btn-secondary">
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from '../../components/Loader.vue'
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'NewProject',
  data: () => ({
    title: '',
    description: '',
    loading: false
  }),
  components: { Loader },
  validations: {
    title: {
      required
    }
  },
  methods: {
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      this.loading = true
      await this.$store.dispatch('newProject', {
        title: this.title,
        description: this.description
      })
      this.$router.push('/projects')
    }
  }
}
</script>
<style>

</style>