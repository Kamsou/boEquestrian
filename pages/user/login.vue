<template>
  <div class="md:flex items-center justify-center block" style="height: 90%">
    <div class="md:flex max-w-5xl h-9 block">
    <!-- Image  -->
    <div class="login_image_left md:w-1/2 w-full">
      <img class="login_image w-full md:h-full object-cover" src="~/assets/images/image-form.jpg" alt="Foret" />
    </div>

    <!-- Formulaire  -->
    <div class="md:w-1/2 w-full p-8">
      <h1 class="font-title text-log text-center">Connexion</h1>

      <div class="alert alert-success"
        v-if="$route.params.registered=='yes'">You have registered successfully</div>

      <div class="row">
        <div class="col-md-6">
          <form action=""
            method="post"
            @submit.prevent="submitForm()">

            <div class="form-group my-3">
              <!-- <label for="">Email</label> -->
              <input type="email" class="form-control border rounded w-full py-2 px-4 outline-none"
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
              <input type="password" class="form-control border rounded w-full py-2 px-4 outline-none"
                :class="{ 'is-invalid': errors && errors.password }"
                v-model="password"
                placeholder="Mot de passe">
              <div class="invalid-feedback" v-if="errors && errors.password">
                {{ errors.password.msg }}
              </div>
            </div>

            <div class="alert alert-danger"
              v-if="login_error">{{ login_error }}</div>
            <div class="text-center">
            <!-- <input type="submit" value="Login" class="btn btn-primary mr-3 my-3"> -->
              <button @click="submitForm" class="border rounded w-full py-2 border-blue-700 bg-blue-600 text-white mr-1">Se connecter</button>
            <!-- <nuxt-link to="/" class="btn btn-secondary mr-3">Fermer</nuxt-link> -->
            </div>
            <div class="my-5 text-gray-500">
              <p class="text-switch">Pas encore inscrit(e)?
                <nuxt-link to="/user/register">
                  <span class="text-blue-600 font-bold cursor-pointer">S'inscrire</span>
                </nuxt-link> 
              </p>
            </div>
          </form>
        </div>
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



