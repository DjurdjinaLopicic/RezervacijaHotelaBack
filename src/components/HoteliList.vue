<template>
    <div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-list"
    ></b-pagination>


    <b-list-group id="my-list">
        <b-list-group-item v-for="item in getItemsForList()" :key="item.id" href="#" class="flex-column align-items-start" :to="`/hotel/${item.id}/${item.naziv}`">
              
            <h2 class="mb-1">{{item.naziv}}</h2>

            <b-container class="bv-example-row">
              <b-row>
                <b-col>
                <div class="caro">
                  <b-carousel
                    id="carousel-1"
                    v-model="slajdovi[item.id]"
                    :interval="0"
                    controls
                    indicators
                    background="#ababab"
                    img-width="300"
                    img-height="150"
                    style="text-shadow: 1px 1px 2px #333;"
                  >
                  <div v-if="item.slike.length > 0" >
                    <b-carousel-slide v-for="slika in item.slike" :key="slika.id" img-height="150" :img-src="slika.url"></b-carousel-slide>
                  </div>
                  <div v-else>
                    <!-- Slide with blank fluid image to maintain slide aspect ratio -->
                    <b-carousel-slide caption="Nema Slike" img-src="https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-7.jpg" img-alt="Nema Slike"></b-carousel-slide>
                    </div>
                  </b-carousel>

                </div>
              </b-col>
              <b-col>
                <p class="mb-1">
                {{item.opis}}
                </p>
              </b-col>
            </b-row>         
            </b-container>
        </b-list-group-item>

    </b-list-group>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-list"
    ></b-pagination>
    </div>
</template>

<script>

    import { mapActions, mapState } from 'vuex'; 

    export default{
        name: "HoteliList",

    data() {
      return {
        perPage: 3,
        currentPage: 1,
        podaci: [],
        slajdovi: {},
        slide: 0,
        sliding: false
      }
    },
    computed: {
        ...mapState([
            'hoteliIds'
        ]),
        rows() {
            return this.hoteliIds.length
        }
    },

    watch: {
      currentPage(nVal, oVal) {
        this.hoteliIds.slice((this.currentPage-1) * this.perPage, (this.currentPage) * this.perPage).map( id => {
          this.getHotel(id).then( obj => {
              if(!this.podaci.filter(item => item.id == obj.id)[0]){
                this.podaci.push(obj) 
                this.slajdovi[obj.id] = 0;
              }
          });
        });
      },

      hoteliIds(nVal, oVal) {
        this.currentPage = 1;
        this.podaci = [];

        nVal.slice((this.currentPage-1) * this.perPage, (this.currentPage) * this.perPage).map( id => {
          this.getHotel(id).then( obj => {
              this.podaci.push(obj)
              this.slajdovi[obj.id] = 0;
          });
        });
      }
    },

    mounted(){
        if(this.hoteliIds){
            this.hoteliIds.slice((this.currentPage-1) * this.perPage, (this.currentPage) * this.perPage).map( id => {
            this.getHotel(id).then( obj => {
              this.podaci.push(obj);
              this.slajdovi[obj.id] = 0;
            });
            });
        }
    },

    methods: {
        ...mapActions([
            'getHotel'
        ]),
        getItemsForList() {
            return this.podaci.slice(
            (this.currentPage - 1) * this.perPage,
            this.currentPage * this.perPage,
            );
        }
    }
    }
</script>

<style scoped>
  .caro{
    width: 500px;
  }
</style>