<template>
    <div>
        <h4>Tip sobe</h4>
        <b-dropdown id="dropdown-1" :text="tip" class="m-md-2">
            <b-dropdown-item @click="ugasi()">Bez filtera</b-dropdown-item>
            <b-dropdown-item v-for="tipSobe in tipoviSoba" :key="tipSobe.id" @click="filtriraj(tipSobe.id, tipSobe.tip)">{{tipSobe.tip}}</b-dropdown-item>
        </b-dropdown>     
    </div>
</template>


<script>

    import { mapActions, mapState, mapMutations } from 'vuex'; 

    export default{
        name: 'TipSobeFilter',

        data(){
            return{
                tip: "Tip sobe"
            }
        },

        computed: {
            ...mapState([
                'tipoviSoba'
            ])
        },

        methods: {
            ...mapActions([
                'fetchHoteliIds',
                'fetchHoteliByTipSobe',
            ]),

            ugasi(){
                this.tip = "Tip sobe";
                this.fetchHoteliIds();
            },

            filtriraj(id, tip){
                this.tip = tip;
                this.fetchHoteliByTipSobe(id);
            }
        },

    }


</script>