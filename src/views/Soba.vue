<template>
    <div v-if="soba && hotel">
        <Header v-if="soba" :naslov="hotel.naziv" />
            <h2>{{soba.tipSobe}}</h2>
            <b-container class="bv-example-row" v-if="soba">
            <div class="caro">
                <b-carousel
                id="carousel-1"
                v-model="slide"
                :interval="0"
                controls
                indicators
                background="#ababab"
                img-width="300"
                img-height="150"
                style="text-shadow: 1px 1px 2px #333;"
                >
                <div v-if="soba.slike.length > 0" >``
                <b-carousel-slide v-for="slika in soba.slike" :key="slika.id" img-height="150" :img-src="slika.url"></b-carousel-slide>
                </div>
                <div v-else>
                <!-- Slide with blank fluid image to maintain slide aspect ratio -->
                <b-carousel-slide caption="Nema Slike" img-src="https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-7.jpg" img-alt="Nema Slike"></b-carousel-slide>
                </div>
                </b-carousel>

            </div>

        <h5>{{soba.opis}}</h5>
        <h3>Cena: {{soba.cena}}</h3>
        <br>
        <hr>
        <div v-if='username'>
            <h2>Rezervisi sobu:</h2>
            <b-form-datepicker v-model="pocetni" :date-disabled-fn="datePocetniDisabled" :min="minOd" :max="maxOd" locale="en"></b-form-datepicker>
    
            <b-form-datepicker v-model="krajnji" :date-disabled-fn="dateKrajnjiDisabled" :min="minDo" locale="en"></b-form-datepicker>

            <b-button @click="rezervisiSobu()" :disabled="disable" >Rezrevisi sobu</b-button>
            
            <b-button @click="obrisiSelekciju()" >Obrisi selekciju</b-button>
        </div>
        </b-container>
        
    </div>
</template>

<script>

    
    import Header from '@/components/Header.vue'
    import { mapActions, mapState } from 'vuex';

    export default{
        name: "Soba",

        data(){
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
            const minDate = new Date(today)
            
            const maxDate = new Date(today)
            maxDate.setFullYear(maxDate.getFullYear() + 3)

            return{
                id: null,
                soba: null,
                hotel: null,
                slajdovi: {},
                slide: 0,
                sliding: false,

                disable: true,
                pocetni: '',
                krajnji: '',

                minOd: minDate,
                minDo: minDate,

                maxOd: maxDate,

                zauzetiDatumi: []

            }
        },

        components: {
            Header
        },

        mounted(){
            this.id = this.$route.params.id;
                this.getSoba(this.id).then(obj => {
                    this.soba = obj;
                    this.getHotel(this.soba.hotelId).then(h => this.hotel = h);
                }); 
            if(this.username && !this.korisnik["id"]){
                this.fetchKorisnikByUsername(this.username);
            }  
        },

        watch: {
            $route(){
                this.id = this.$route.params.id;
                this.getSoba(this.id).then(obj => {
                    this.soba = obj;
                    this.getHotel(this.soba.hotelId).then(h => this.hotel = h);
                });                
            },
            pocetni(nVal, oVal){
                this.minDo = this.pocetni;

                if(this.krajnji !=''){
                    this.disable = false;
                }

            },
            krajnji(nVal, oVal){
                this.maxOd = this.krajnji;
                if(this.pocetni != ''){
                    this.disable = false;
                }
            },
            username(nVal, oVal){
                if(!this.korisnik['id']){
                    this.fetchKorisnikByUsername(nVal);
                }
            }
        },

        computed: {
            ...mapState([
                "username",
                "korisnik"
            ])
        },

        methods: {
            ...mapActions([
                "getSoba",
                "getHotel",
                "postRezervacija",
                "fetchKorisnikByUsername"
            ]),

            rezervisiSobu(){
                const obj = {
                    datumPocetka: this.pocetni,
                    datumKraja: this.krajnji,
                    korisnikId: this.korisnik.id,
                    sobaId: this.soba.id
                }
                this.postRezervacija(obj);
                this.pocetni = '';
                this.krajnji = '';
                this.disable = true;
            },

            datePocetniDisabled(ymd, date) {
                var weekday = date.getMonth()+1;
                if(weekday.toString().length == 1){
                    weekday = "0"+weekday;
                }
                var day = date.getDate()
                if(day.toString().length == 1){
                    day = "0"+day;
                }
                var year = date.getFullYear();
                var datum = year+"-"+weekday+"-"+day;
                
                var povratna = false;

                var brojSlobodnih = this.soba.broj;
                this.soba.rezervacije.forEach(rezervacija => {
                    if(datum >= rezervacija.datumPocetka && datum <= rezervacija.datumKraja){
                        brojSlobodnih = brojSlobodnih - 1;
                    }
                    if( (this.krajnji != '' && this.krajnji >= rezervacija.datumKraja  && datum <= rezervacija.datumKraja)){
                        brojSlobodnih = brojSlobodnih - 1;
                    }
                    if(brojSlobodnih <= 0){
                        povratna = true;
                    }
                })
                return povratna;
            },

            
            dateKrajnjiDisabled(ymd, date) {
                var weekday = date.getMonth()+1;
                if(weekday.toString().length == 1){
                    weekday = "0"+weekday;
                }
                var day = date.getDate()
                if(day.toString().length == 1){
                    day = "0"+day;
                }
                var year = date.getFullYear();
                var datum = year+"-"+weekday+"-"+day;
                
                var povratna = false;

                var brojSlobodnih = this.soba.broj;
                this.soba.rezervacije.forEach(rezervacija => {
                    if((datum >= rezervacija.datumPocetka && datum <= rezervacija.datumKraja)){
                        brojSlobodnih = brojSlobodnih - 1;
                    }
                    if( (this.pocetni != '' && this.pocetni <= rezervacija.datumPocetka  && datum >= rezervacija.datumPocetka)){
                        brojSlobodnih = brojSlobodnih - 1;
                    }
                    if(brojSlobodnih <= 0){
                        povratna = true;
                    }
                })
                return povratna;
            },

            obrisiSelekciju(){
                this.pocetni = '';
                this.krajnji = '';
                this.disable = true;
            }
        }
    }

</script>


<style scoped>
  .caro{
    width: 1000px;
  }
</style>