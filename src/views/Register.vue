<template>
  <div id="app">
    <Header naslov="Registracija"/>

    <b-form @submit="onSubmit">
      <b-form-group label="Email adresa:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Unesite email" required></b-form-input>
      </b-form-group>

      <b-form-group label="Korisnicko ime:" label-for="name">
        <b-form-input id="name" v-model="form.username" placeholder="Unesite korisnicko ime" required></b-form-input>
        <p class="greska">{{usernameError}}</p>
      </b-form-group>

      <b-form-group label="Sifra:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
        <p class="greska">{{passwordError}}</p>
      </b-form-group>

      <b-form-group label="Ime:" label-for="ime">
        <b-form-input id="ime" v-model="form.ime" placeholder="Unesite ime" required></b-form-input>
      </b-form-group>

      <b-form-group label="Prezime:" label-for="prezime">
        <b-form-input id="prezime" v-model="form.prezime" placeholder="Unesite prezime" required></b-form-input>
      </b-form-group>

      <br>
      <b-button type="submit" variant="primary">Registruj se</b-button>
    </b-form>
  </div>
</template>

<script>

  import Header from '@/components/Header.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'Register',
    
    components: {
      Header
    },

    data() {
      return {
        form: {
          email: '',
          username: '',
          password: '',
          ime: '',
          prezime: '',
          tip: 2
        },
        passwordError: "",
        usernameError: ""
      }
    },

    methods: {
      ...mapActions([
        'register',
        'isUsernameAvailable'
      ]),

      onSubmit(e) {
        e.preventDefault();
        if(this.form.password.length < 5){
          this.passwordError = "Sifra mora biti duzine 5";
        }else{
          this.passwordError = "";
          var slobodan = false;
          this.isUsernameAvailable(this.form.username).then(res => {
            if(res.slobodan){
              slobodan = true;
            }
            if(slobodan){
              this.usernameError = "";
              this.register(this.form);
              this.$router.push({ name: 'Hoteli' });
            }else{
              this.usernameError = "Korisnicko ime je zauzeto"
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .greska{
    color: red
  }
</style>
