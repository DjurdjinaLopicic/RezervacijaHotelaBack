<template>
    <div class="filteri">
        <h2>Filteri</h2>
        <hr>
        <TipSobeFilter />
        <br>
        <CenaFilter />
    </div>
</template>

<script>
    
    import TipSobeFilter from '@/components/TipSobeFilter.vue'
    import CenaFilter from '@/components/CenaFilter.vue'

    export default{
        name: "Filteri",

        components: {
            TipSobeFilter,
            CenaFilter
        }
    }
</script>

<style scoped>
    .filteri{
        position: sticky;
        top: 0;
        padding-top:100px;
    }
</style>