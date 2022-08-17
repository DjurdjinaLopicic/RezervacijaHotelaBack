<template>
    <div>
        <Header naslov="Izmeni profil" />
        <b-form v-if="korisnik" @submit="onSubmit">
            <b-form-group label="Email adresa:" label-for="email">
                <b-form-input id="email" v-model="form.email" type="email" :placeholder="korisnik.email" required></b-form-input>
            </b-form-group>

            <b-form-group label="Korisnicko ime:" label-for="name">
                <b-form-input id="name" v-model="form.username" :placeholder="korisnik.username" required></b-form-input>
            </b-form-group>

            <b-form-group label="Sifra:" label-for="password">
                <b-form-input id="password" v-model="form.password" type="password" required></b-form-input>
            </b-form-group>

            <b-form-group label="Ime:" label-for="ime">
                <b-form-input id="ime" v-model="form.ime" :placeholder="korisnik.ime" required></b-form-input>
            </b-form-group>

            <b-form-group label="Prezime:" label-for="prezime">
                <b-form-input id="prezime" v-model="form.prezime" :placeholder="korisnik.prezime" required></b-form-input>
            </b-form-group>

            <br>
            <b-button type="submit" variant="primary">Izmeni</b-button>
        </b-form>
    </div>
</template>

<script>

    import Header from '@/components/Header.vue'
      import { mapActions, mapState } from 'vuex';

    export default{
        name: "IzmeniProfil",

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
                }
            }
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
                'updateKorisnik'
            ]),
            onSubmit(e) {
                e.preventDefault();
                const obj = {
                    id: this.korisnik.id,
                    form: this.form
                }
                this.updateKorisnik(obj);
                this.$router.push({ name: 'Profil' });
            }
        },

        mounted(){
            if(!localStorage.username){
                this.$router.push({ name: 'Login' });
            }
            if(!this.korisnik){
                this.fetchKorisnikByUsername(localStorage.username);
            }
            if(this.korisnik){
                this.form["username"] = this.korisnik.username;
                this.form["email"] = this.korisnik.email;
                this.form["ime"] = this.korisnik.ime;
                this.form["prezime"] = this.korisnik.prezime;
            }
        }
    }

</script>

<style scoped>
</style>