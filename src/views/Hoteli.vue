<template>
    <div>
        <Header naslov="Hoteli" />
            <b-row class="text-center">
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
        name: "Hoteli",

        components: {
            HoteliList,
            Header,
            Filteri
        },

        methods: {
            ...mapActions([
                'fetchHoteliIds'
            ])
        },

        mounted(){
            this.fetchHoteliIds();
        }
    }

</script>

<style scoped>
    .filteri{
        margin-top:-50px;
    }
</style>