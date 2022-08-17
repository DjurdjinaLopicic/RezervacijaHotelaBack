<template>
  <div id="app">
    <Header naslov="Prijava"/>

    <b-form @submit="onSubmit">
      <b-form-group label="Korisnicko ime:" label-for="name">
        <b-form-input id="name" v-model="form.username" placeholder="Enter name" required></b-form-input>
      </b-form-group>

      <b-form-group label=" Sifra:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
        <p class="greska"> {{greskaPass}} </p>
      </b-form-group>

      <b-button type="submit" variant="primary">Prijavi se</b-button>
    </b-form>
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Login',
    
    components: {
      Header
    },

    computed: {
      ...mapState[(
        "token"
      )]
    },

    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        greskaPass: ''
      }
    },

    mounted(){
      if(this.token != null){
        this.$router.push({ name: 'Hoteli' });
      }
    },

    methods: {
      ...mapActions([
        'login'
      ]),

      onSubmit(e) {
        e.preventDefault();

        if(this.form.password.length < 5){
          this.greskaPass = "Sifra mora biti duzine 5"
        }else{
          this.login(this.form).then(tkn => {
            if(tkn.token){
              this.$router.push({ name: 'Hoteli' })
            }
          });
        }
      }
    }
  }
</script>

<style scoped>
  .greska{
    color:red
  }
</style>
