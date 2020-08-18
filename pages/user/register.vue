<template>
  <div>
    <h1>Inscription</h1>
    <hr>

    <div class="row">
      <div class="col-md-6">
        <form action=""
          method="post"
          @submit.prevent="submitForm()">

          <div class="form-group">
            <!-- <label for="">Nom complet</label> -->
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.full_name }"
              v-model="full_name"
              placeholder="Nom complet">
            <div class="invalid-feedback" v-if="errors && errors.full_name">
              {{ errors.full_name.msg }}
            </div>
          </div>

          <div class="form-group">
            <!-- <label for="">Email</label> -->
            <input type="text" class="form-control"
              :class="{ 'is-invalid': errors && errors.email }"
              v-model="email"
              placeholder="Email">
            <div class="invalid-feedback" v-if="errors && errors.email">
              {{ errors.email.msg }}
            </div>
          </div>

          <div class="form-group">
            <!-- <label for="">Mot de passe</label> -->
            <input type="password" class="form-control"
              :class="{ 'is-invalid': errors && errors.password }"
              v-model="password"
              placeholder="Mot de passe">
            <div class="invalid-feedback" v-if="errors && errors.password">
              {{ errors.password.msg }}
            </div>
          </div>

          <input type="submit" value="Register" class="btn btn-primary mr-3">
          <!-- <nuxt-link to="/" class="btn btn-secondary mr-3">Fermer</nuxt-link> -->
          
          <div>
            <p>Déjà inscrit(e) ? Go</p>
          </div>
        </form>
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
