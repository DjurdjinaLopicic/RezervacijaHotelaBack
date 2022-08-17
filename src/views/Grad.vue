<template>
    <div>
        <Header :naslov="naziv" />
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
    import { mapActions } from 'vuex';

    export default{
        name: "Grad",

        components: {
            HoteliList,
            Header,
            Filteri
        },


        data(){
            return {
                naziv: "",
                id: null
            }
        },

        watch: {
            $route(){
                this.naziv = this.$route.params.naziv;
                this.id = this.$route.params.id;
                
                this.fetchHoteliIdsByGrad(this.id);
            }
        },

        mounted(){
                this.naziv = this.$route.params.naziv;
                this.id = this.$route.params.id;

                this.fetchHoteliIdsByGrad(this.id);
        },

        methods: {
            ...mapActions([
                'fetchHoteliIdsByGrad'
            ])
        }

    }

</script>

<style scoped>
    .filteri{
        margin-top:-50px;
    }
</style>