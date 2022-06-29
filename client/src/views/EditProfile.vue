<template>
  <div class="container form">
    <Loader v-if="loading"/>
    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
      {{ alertMessage }}
    </b-alert>
    <div class="row h-100 justify-content-center">
      <div class="col-6 mt-5">
        <h2 class="text-center">
          Edit Profile
        </h2>
        <form action="" @submit.prevent="">
          <div class="form-group">
            <label for="">Name</label>
            <input type="text" class="form-control" v-model="name">
          </div>
          <div class="form-group">
            <label for="">Email</label>
            <input type="email" class="form-control" v-model="email">
          </div>
          <div class="form-group">
            <label for="">Password</label>
            <input type="password" class="form-control" v-model="password">
            <small class="form-text text-muted">
              Leave blank if you don't want to change it
            </small>
          </div>
          <div class="form-group">
            <label for="">Confirm Password</label>
            <input type="password" class="form-control" v-model="confirmPass">
          </div>
          <div class="form-group">
            <label for="">Current password</label>
            <input type="password" class="form-control" v-model="currentPass">
          </div>
          <div class="form-group">
            <input @submit.prevent="submit" type="button" class="btn btn-info" value="Update">
          </div>
        </form>
        <div class="text-center mt-5">
          <a href="" class="text-muted" @click.prevent="deleteUser">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
            </svg>
            Delete account
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, email, minLength, sameAs } from 'vuelidate/src/validators'
export default {
  name: 'EditProfile',
  data: () => ({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
    currentPass: '',
    showDismissibleAlert: false,
    alertMessage: '',
    loading: false
  }),
  async mounted() {
    await this.$store.dispatch('getUser', localStorage.getItem('userId'));
    this.name = this.$store.state.user.name;
    this.email = this.$store.state.user.email;
  },
  validations: {
    name: { required },
    email: { required, email },
    password: { minLength: minLength(6), required },
    confirmPass: { sameAs: sameAs('password'), required },
    currentPass: { minLength: minLength(6), required },
  },
  methods: {
    async submit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.showDismissibleAlert = true
        if (this.$v.name.$invalid) {
          this.alertMessage = 'Name is required'
        } else if (this.$v.password.$invalid) {
            this.alertMessage = 'Password is required and must be at least 5 characters long'
        } else if (this.$v.email.$invalid) {
          this.alertMessage = 'Email is required and must be a valid email address'
				} else if (this.$v.confirmPass.$invalid) {
          this.alertMessage = 'Password confirmation must match password'
        }
        return
      }
      this.loading = true
      try {
        await this.$store.dispatch('checkPass', {
          password: this.currentPass
        })
        await this.$store.dispatch('editUser', {
          name: this.name,
          email: this.email,
          password: this.password,
        })
      } catch (e) {
        this.alertMessage = this.$store.state.authErrorMessage
        this.showDismissibleAlert = true
        this.loading = false
      }
    },
    async deleteUser() {
      await this.$store.dispatch('deleteUser', localStorage.getItem('userId'))
      this.$router.push('/')
    }
  }
}
</script>