<template>
    <div>
        <Header naslov="Profil" />
        <div v-if="korisnik">
            Korisnicko ime: {{korisnik.username}}<br>
            Ime: {{korisnik.ime}}<br>
            Prezime: {{korisnik.prezime}}<br>
            email: {{korisnik.email}}<br>
            <b-button @click="izmeniProfil()" >Izmeni profil</b-button>
            <h3>Rezervacije</h3>
            <RezervacijeList  />
        </div>
    </div>
</template>

<script>

    import Header from '@/components/Header.vue'
    import RezervacijeList from '@/components/RezervacijeList.vue'
      import { mapActions, mapState } from 'vuex';

    export default{
        name: "Profil",

        components: {
            Header,
            RezervacijeList
        },

        computed: {
            ...mapState([
                'username',
                'korisnik'
            ])
        },

        methods: {
            ...mapActions([
                "fetchKorisnikByUsername",
            ]),

            izmeniProfil(){
                this.$router.push({ name: 'IzmeniProfil' });
            }
        },

        watch: {
            username(nVal, oVal){
                if(nVal){
                    this.fetchKorisnikByUsername(nVal);
                }
            }
        },

        mounted(){
            if(!localStorage.username){
                this.$router.push({ name: 'Login' });
            }
            if(this.username){
                this.fetchKorisnikByUsername(localStorage.username);
            }
        }
    }

</script>

<style scoped>
</style>