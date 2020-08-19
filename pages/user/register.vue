<template>
    <div class="md:flex items-center justify-center block" style="height: 90%">
    <div class="md:flex max-w-5xl h-9 block">
    <!-- Image  -->
    <div class="login_image_left md:w-1/2 w-full">
      <img class="login_image w-full h-full object-cover" src="~/assets/images/image-form.jpg" alt="Foret" />
    </div>

    <!-- Formulaire  -->
    <div class="md:w-1/2 w-full p-8">
      <h1 class="font-title text-log text-center">Inscription</h1>



    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group my-3">
            <!-- <label for="">Nom complet</label> -->
            <input type="text" class="form-control border rounded w-full py-2 px-4 outline-none"
              :class="{ 'is-invalid': errors && errors.full_name }"
              v-model="full_name"
              placeholder="Nom complet">
            <div class="invalid-feedback" v-if="errors && errors.full_name">
              {{ errors.full_name.msg }}
            </div>
          </div>

          <div class="form-group my-3">
            <!-- <label for="">Email</label> -->
            <input type="text" class="form-control border rounded w-full py-2 px-4 outline-none"
              :class="{ 'is-invalid': errors && errors.email }"
              v-model="email"
              placeholder="Email">
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

          <!-- <input type="submit" value="Register" class="btn btn-primary mr-3"> -->
          <!-- <nuxt-link to="/" class="btn btn-secondary mr-3">Fermer</nuxt-link> -->
          <div class="text-center">
              <button @click="submitForm" class="border rounded w-full py-2 border-blue-700 bg-blue-600 text-white mr-1">S'inscrire</button>
            </div>
          
          <div class="my-5 text-gray-500">
              <p class="text-switch">Déjà inscrit(e)?
                <nuxt-link to="/user/register">
                  <span class="text-blue-600 font-bold cursor-pointer">Se connecter</span>
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
      full_name:null,
      email:null,
      password:null,
      status:false,
    }
  },

  methods:{
    submitForm(){
      this.$axios.post( '/api/users/register', {
          full_name: this.full_name,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response)

          if(response.data._id){
            this.$router.push({ name:'user-login', params:{ registered:'yes' } })
            // log in if successfully registered
            this.$auth.loginWith('local', {
                data: {
                  email: this.email,
                  password: this.password
                }
              })
              .catch( (error) => {
                console.log(error)
              })
          }
        })
        .catch( (error) => {
          console.log(error)
          if(error.response.data.errors){
            this.errors = error.response.data.errors
          }
        });
    }
  }
}
</script>
