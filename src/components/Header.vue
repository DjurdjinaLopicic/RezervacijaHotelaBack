<template>
    <div class="naslov">
        <h1> {{ naslov }}</h1>
    </div>
</template>

<script>

    export default{
        name: "Header",

        props: {
            naslov: String
        }
    }

</script>

<style scoped>
    .naslov{
        padding-top: 15px;
        padding-bottom: 15px;
    }
</style>