<template>
  <div>
  <h3>Komentari</h3>
  <div v-if="korisnik['id'] && hotel">
    <br>
    <hr>
    <div v-if="token">
      <b-form-input
        v-model="comment"
        placeholder="Komentar..."
        @keydown.enter="onSubmit"
      ></b-form-input>

      <b-card v-for="comment in hotel.komentari" :title="comment.korisnik.username" :key="comment.id">
        <b-card-text v-if="comment">
          {{ comment.tekst }}
        </b-card-text>
      </b-card>
    </div>
  </div>
  <p v-else>Morate se prijaviti da biste citali i ostavljali komentare</p>
  
  </div>
</template>

<script>

  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'Komentari',

    props: {
      hotel: Object
    },

    data() {
      return {
        comment: ''
      }
    },

    computed: {
      ...mapState([
        'token',
        'korisnik',
        'username'
      ])
    },

    methods: {
      ...mapActions([
        'postComment',
        'fetchKorisnikByUsername'
      ]),

      onSubmit() {
        this.$socket.emit('comment', { body: this.comment, hotelId: this.hotel.id, token: this.token, korisnikId: this.korisnik.id });
        this.comment = '';
      }
    },

    watch: {
      username(nVal, oVal){
        if(!this.korisnik["id"]){
          if(nVal && this.token){
            this.fetchKorisnikByUsername(nVal);
          }
        }
      },
      token(nVal, oVal){
        if(!this.korisnik["id"]){
          if(nVal && this.username){
            this.fetchKorisnikByUsername(this.username);
          }
        }
      }
    },

    mounted(){
      if(!this.korisnik["id"]){
        if(this.username && this.token){
          this.fetchKorisnikByUsername(this.username);
        }
      }
    }

  }
  //Vidi gde nisi stavila uslov

</script>

<style scoped>
  .card {
    margin-top: 10px;
    text-align: left;
  }

  .card-title {
    margin-bottom: 0px;
  }

  .card-body {
    padding-bottom: 5px;
  }
</style>