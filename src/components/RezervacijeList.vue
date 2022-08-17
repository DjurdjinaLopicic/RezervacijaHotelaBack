<template>
    <div>
        <b-pagination
        v-model="currentPage"
        :total-rows="rez.length"
        :per-page="perPage"
        aria-controls="rezervacije-table"
        ></b-pagination>
        <b-table
        id="rezervacije-table"
        hover
        fixed
        :items="rez"
        :fields="fields"
        small
        :per-page="perPage"
        :current-page="currentPage"
        >
        </b-table>
        <b-pagination
        v-model="currentPage"
        :total-rows="rez.length"
        :per-page="perPage"
        aria-controls="image-table"
        ></b-pagination>
    </div>
</template>



<script> 
    import { mapActions, mapState } from 'vuex';
    export default{
        name: "RezervacijeList",

        computed: {
            ...mapState([
                "rezervacije",
                "tipoviSoba"
            ])
        },
        data() {
            return {
                fields: ['hotel', 'tipSobe', 'datumPocetka', 'datumKraja'],
                perPage: 3,
                currentPage: 1,
                podaci: [],
                rez: []
            }
        },

        watch: {
            rezervacije(nVal, oVal){
            this.podaci = nVal;
            this.podaci.forEach(podatak => {
                if(!podatak["soba"]){
                    this.getSoba(podatak.sobaId).then(soba => {
                        podatak["soba"] = soba;
                        const item = this.tipoviSoba.filter( item => item.id == soba.tipSobeId )[0];
                        if(item){
                            podatak["tipSobe"] = item.tip;
                        }
                        this.getHotel(soba.hotelId).then(hotel => {
                            podatak["hotel"] = hotel.naziv;
                            this.rez = this.podaci;
                        });
                    })
                }else{
                    this.rez = this.podaci;
                }
            })
            }
        },

        mounted(){
            this.podaci = this.rezervacije;
            this.podaci.forEach(podatak => {
                if(!podatak["soba"]){
                    this.getSoba(podatak.sobaId).then(soba => {
                        podatak["soba"] = soba;
                        const item = this.tipoviSoba.filter( item => item.id == soba.tipSobeId )[0];
                        if(item){
                            podatak["tipSobe"] = item.tip;
                        }
                        this.getHotel(soba.hotelId).then(hotel => {
                            podatak["hotel"] = hotel.naziv;
                            this.rez = this.podaci;
                        });
                    })
                }else{
                    this.rez = this.podaci;
                }
            })
        },

        methods: {
            ...mapActions([
                "getSoba",
                "getHotel"
            ])
        }
    }
</script>