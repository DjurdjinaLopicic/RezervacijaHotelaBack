<template>
    <div>
        <h4>Cena:</h4>  
        <b-input-group prepend="Min:" class="mt-3">
            <b-form-input type="number" min="0" v-model="minValue"></b-form-input>
            <b-input-group-append>
            <b-button variant="info" class="beli" @click="filtrirajMin()">Primeni</b-button>
            </b-input-group-append>
        </b-input-group>
        <b-input-group prepend="Max:" class="mt-3">
            <b-form-input type="number" min="0" v-model="maxValue"></b-form-input>
            <b-input-group-append>
            <b-button variant="info" class="beli" @click="filtrirajMax()">Primeni</b-button>
            </b-input-group-append>
        </b-input-group>
        <br>
        <b-button variant="info" class="beli" @click="iskljuci()">Iskljuci filter za cenu</b-button>
    </div>
</template>

<script>

    import { mapActions } from 'vuex';

    export default{
        name: "CenaFilter",

        data(){
            return{
                minValue: 0,
                maxValue: 0,
                minPrimenjen: -1,
                maxPrimenjen: -1
            }
        },

        methods: {
            ...mapActions([
                "fetchHoteliIdsByCenaSobeMin",
                "fetchHoteliIdsByCenaSobeMax",
                "fetchHoteliIdsByCenaSobeRange",
                "fetchHoteliIds"
            ]),

            filtrirajMin(){
                this.minPrimenjen = this.minValue;
                if(this.maxPrimenjen != -1){
                    const obj = {
                        cena1: this.minValue,
                        cena2: this.maxPrimenjen
                    }
                    this.fetchHoteliIdsByCenaSobeRange(obj);
                }else{
                    this.fetchHoteliIdsByCenaSobeMin(this.minValue);
                } 
            },

            filtrirajMax(){
                this.maxPrimenjen = this.maxValue;
                if(this.minPrimenjen != -1){
                    const obj = {
                        cena1: this.minPrimenjen,
                        cena2: this.maxValue
                    }
                    this.fetchHoteliIdsByCenaSobeRange(obj);
                }else{
                    this.fetchHoteliIdsByCenaSobeMax(this.maxValue);
                }
            },

            iskljuci(){
                this.minPrimenjen = -1;
                this.maxPrimenjen = -1;
                this.minValue = 0;
                this.maxValue = 0;
                this.fetchHoteliIds();
            }
        }


    }
</script>

<style scoped>
    .beli{
        color:white;
    }
</style>