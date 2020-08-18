<template>
  <div class="flex items-center justify-center">
    <!-- Image  -->
    <div class="login_image_left w-1/2">
      <img class="login_image" src="~/assets/images/image-form.jpg" alt="Foret" />
    </div>

    <!-- Formulaire  -->
    <div class="w-1/2 p-8">
      <h1 class="text-sm">Connexion</h1>

      <div class="alert alert-success"
        v-if="$route.params.registered=='yes'">You have registered successfully</div>

      <div class="row">
        <div class="col-md-6">
          <form action=""
            method="post"
            @submit.prevent="submitForm()">

            <div class="form-group my-3">
              <!-- <label for="">Email</label> -->
              <input type="email" class="form-control border rounded py-2 px-4 outline-none"
                :class="{ 'is-invalid': errors && errors.email }"
                v-model="email"
                placeholder="Email"
                >
              <div class="invalid-feedback" v-if="errors && errors.email">
                {{ errors.email.msg }}
              </div>
            </div>

            <div class="form-group my-3">
              <!-- <label for="">Mot de passe</label> -->
              <input type="password" class="form-control border rounded py-2 px-4 outline-none"
                :class="{ 'is-invalid': errors && errors.password }"
                v-model="password"
                placeholder="Mot de passe">
              <div class="invalid-feedback" v-if="errors && errors.password">
                {{ errors.password.msg }}
              </div>
            </div>

            <div class="alert alert-danger"
              v-if="login_error">{{ login_error }}</div>

            <input type="submit" value="Login" class="btn btn-primary mr-3 my-3">
            <!-- <nuxt-link to="/" class="btn btn-secondary mr-3">Fermer</nuxt-link> -->

            <div class="my-3">
              <p>Pas encore inscrit(e) ? j'y vais</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  auth: 'guest',
  data(){
    return{
      errors:null,
      login_error:null,
      email:null,
      password:null,
      status:false,
    }
  },

  methods:{
    submitForm(){
      this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .catch( (error) => {
          console.log(error)
          if(error.response.data.message){
            this.login_error = error.response.data.message
          }
        })
    }
  }
}
</script>



