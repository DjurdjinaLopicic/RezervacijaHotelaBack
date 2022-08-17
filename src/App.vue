<template>
  <div id="app">

    <div>
      <b-navbar toggleable="sm" type="dark" variant="info" fixed="top">
        <b-navbar-brand to="/">Rezervacija Hotela</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Hoteli</b-nav-item>

            <b-nav-item-dropdown text="Gradovi">
              <b-dropdown-item
                v-for="grad in gradovi"
                :key="grad.id"
                :to="`/grad/${grad.id}/${grad.naziv}`">
                {{ grad.naziv }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>

          <b-nav-form right>
            <b-form-input v-model="searchQuery" size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button @click="search" size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>
          <b-navbar-nav class="ml-auto" right>
            <b-nav-item v-if="!token" to="/register">Registruj se</b-nav-item>
            <b-nav-item v-if="!token" to="/login">Prijavi se</b-nav-item>
            <b-nav-item-dropdown v-else :text="username">
              <b-dropdown-item :to="`/profil`" >Profil</b-dropdown-item>
              <b-dropdown-item @click="logout()">Odjavi se</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
      </b-navbar>
    </div>
    <div class="ruter">
      <router-view class="stranica" />
    </div>
  </div>
</template>

<script>

  import { mapActions, mapState, mapMutations } from 'vuex';

  export default{
    name: 'App',

    data(){
      return{
        searchQuery: ''
      }
    },
    
    computed: {
      ...mapState([
        'gradovi',
        'token',
        'username'
      ])
    },


    methods: {
      ...mapActions([
        'fetchGradovi',
        'fetchTipoviSoba'
      ]),

      ...mapMutations([
        'setToken',
        'setUsername',
        'removeToken',
        'removeUsername'
      ]),

      search(e){
        e.preventDefault();

        const sq = this.searchQuery;
        this.searchQuery = '';

        this.$router.push({ name: 'Search', query: { q: sq } });
      },

      logout(){
        this.removeToken();
        this.removeUsername();
      }
    },

    mounted(){
      this.fetchGradovi();

      if(localStorage.token && localStorage.username){
        this.setToken(localStorage.token);
        this.setUsername(localStorage.username);
      }
      this.fetchTipoviSoba();
    },

    sockets: {
      error(err){
        alert(err);
      }
    }

  }



</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding-left: 20px;
  padding-right: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    padding-bottom: 10px;
  }

  .stranica {
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
  }

  .ruter{
    margin-top:100px;
  }
</style>