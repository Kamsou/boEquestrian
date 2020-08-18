<template>
  <div class="">
    <nav class="flex items-center justify-between text-xs mx-8">
      <nuxt-link to="/" class="">
        <img class="bar_logo" src="~/assets/images/Logo-bo-equestrian.png" alt="logo" />
      </nuxt-link>

      <div class="flex space-x-4">
        <ul class="">
          <li class="">
            <nuxt-link to="/" class="">Accueil</nuxt-link>
          </li>
        </ul>

        <ul class="flex space-x-4"
          v-if="!$auth.loggedIn">
          <li class="">
            <nuxt-link to="/user/register" class="">Inscription</nuxt-link>
          </li>
          <li class="">
            <nuxt-link to="/user/login" class="">Connexion</nuxt-link>
          </li>
        </ul>

        <ul class=""
          v-if="$auth.loggedIn">
          <li class="">
            <nuxt-link to="/user/my-account" class="">Mon compte</nuxt-link>
          </li>
          <li class="">
            <nuxt-link to="/user/logout" class="" >Se déconnecter</nuxt-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="">
      <Nuxt />
    </div>
  </div>
</template>

<style lang="scss">

@font-face {
  font-family: "Mobile Sans";
  src: url("../assets/fonts/mobile_sans.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Deja Vu";
  src: url("../assets/fonts/dejavu_sans_condensed.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

html {
  font-family: "Deja Vu";
}

.bar_logo {
  width: 13vw;
}

</style>

