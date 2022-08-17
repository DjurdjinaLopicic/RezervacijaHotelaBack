<template>
    <div>
        <Header :naslov="naslov" />
        <b-row>
            <b-col cols="4" class="filteri">
                <Filteri />
            </b-col>
            <b-col cols="8">
                <HoteliList/>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    
    import HoteliList from '@/components/HoteliList.vue'
    import Header from '@/components/Header.vue'
    import Filteri from '@/components/Filteri.vue'
    import { mapActions } from 'vuex'

    export default{
        name: "Search",

        components: {
            HoteliList,
            Header,
            Filteri
        },

        data(){
            return{
                naslov : ''
            }
        },

        watch: {
            $route(){
                this.fetchHoteliIdsByNaziv(this.$route.query.q);
                this.naslov = `Rezultati pretrage: ${this.$route.query.q}`;
            }
        },

        mounted(){
            this.fetchHoteliIdsByNaziv(this.$route.query.q);
            this.naslov = `Rezultati pretrage: ${this.$route.query.q}`;
        },

        methods: {
            ...mapActions([
                'fetchHoteliIdsByNaziv'
            ])
        }

    }

</script>

<style scoped>
    .filteri{
        margin-top:-50px;
    }
</style>