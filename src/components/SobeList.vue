<template>
    <div>
        <h2>Sobe</h2>

        <b-pagination
        v-model="currentPage"
        :total-rows="podaci.length"
        :per-page="perPage"
        aria-controls="image-table"
        ></b-pagination>
        <b-table
        id="image-table"
        hover
        fixed
        :items="podaci"
        :fields="fields"
        small
        :per-page="perPage"
        :current-page="currentPage"
        @row-clicked="rowClicked"
        >
        </b-table>
        <b-pagination
        v-model="currentPage"
        :total-rows="podaci.length"
        :per-page="perPage"
        aria-controls="image-table"
        ></b-pagination>
    </div>
</template>

<script>

    import { mapActions, mapState } from 'vuex'; 

    export default{
        name: 'SobeList',

        data() {
        return {
            fields: ['tipSobe', 'cena'],
            perPage: 3,
            currentPage: 1,
            podaci: []
        }
        },
        computed: {
            ...mapState([
                'sobeIds'
            ]),
        },

        watch: {
        currentPage(nVal, oVal) {
            this.sobeIds.slice((this.currentPage-1) * this.perPage, (this.currentPage) * this.perPage).map( id => {
            this.getSoba(id).then( obj => {
                if(!this.podaci.filter(item => item.id == obj.id)[0]){
                    this.podaci.push(obj) 
                }
            });
            });
        },

        sobeIds(nVal, oVal) {
            this.currentPage = 1;
            this.podaci = [];

            nVal.slice((this.currentPage-1) * this.perPage, (this.currentPage) * this.perPage).map( id => {
            this.getSoba(id).then( obj => {
                this.podaci.push(obj)
            });
            });
        }
        },

        mounted(){
            if(this.sobeIds){
                this.sobeIds.slice((this.currentPage-1) * this.perPage, (this.currentPage) * this.perPage).map( id => {
                this.getSoba(id).then( obj => {
                this.podaci.push(obj);
                });
                });
            }
        },

        methods: {
            ...mapActions([
                'getSoba'
            ]),
            rowClicked(record, index) {
                this.$router.push({ name: 'Soba', params: { id: record.id } });
            }
        }
    }
</script>

<style>