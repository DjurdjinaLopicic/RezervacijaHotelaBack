<template>
    <div>
        <Header :naslov="naziv" />
        <b-container class="bv-example-row" v-if="hotel">
            <div class="caro">
                <b-carousel
                id="carousel-1"
                v-model="slajdovi[hotel.id]"
                :interval="0"
                controls
                indicators
                background="#ababab"
                img-width="300"
                img-height="150"
                style="text-shadow: 1px 1px 2px #333;"
                >
                <div v-if="hotel.slike.length > 0" >
                <b-carousel-slide v-for="slika in hotel.slike" :key="slika.id" img-height="150" :img-src="slika.url"></b-carousel-slide>
                </div>
                <div v-else>
                <!-- Slide with blank fluid image to maintain slide aspect ratio -->
                <b-carousel-slide caption="Nema Slike" img-src="https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-7.jpg" img-alt="Nema Slike"></b-carousel-slide>
                </div>
                </b-carousel>

            </div>

            <p class="mb-1">
            {{hotel.opis}}
            </p>
        </b-container>
        <SobeList />
        <Komentari :hotel="hotel" />
    </div>
</template>

<script>
    
    import Header from '@/components/Header.vue'
    import SobeList from '@/components/SobeList.vue'
    import Komentari from '@/components/Komentari.vue'
    import { mapActions } from 'vuex';

    export default{
        name: "Hotel",

        components: {
            Header,
            SobeList,
            Komentari
        },


        data(){
            return {
                naziv: "",
                id: null,
                hotel: null,
                slajdovi: {},
                slide: 0,
                sliding: false
            }
        },

        watch: {
            $route(){
                this.naziv = this.$route.params.naziv;
                this.id = this.$route.params.id;
                this.getHotel(this.id).then(obj => this.hotel = obj);
                this.fetchSobeIdsByHotel(this.id);
            }
        },

        mounted(){
                this.naziv = this.$route.params.naziv;
                this.id = this.$route.params.id;
                this.getHotel(this.id).then(obj => this.hotel = obj);
                this.fetchSobeIdsByHotel(this.id);
        },

        methods: {
            ...mapActions([
                'getHotel',
                'fetchSobeIdsByHotel'
            ])
        }

    }

</script>

<style scoped>
  .caro{
    width: 1000px;
  }
</style>