import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    gradovi: [],
    hoteliIds: [],
    hoteli: [],
    username: '',
    korisnik: {},
    tipoviSoba: [],
    sobeIds: [],
    sobe: [],
    rezervacije: [],
  },
  mutations: {
    addGradovi(state, gradovi){
      state.gradovi = gradovi;
    },

    addHoteliIds(state, ids){
      state.hoteliIds = ids;
    },

    addHotel(state, hotel){
      const item = state.hoteli.filter( item => item.id == hotel.id )[0];
      if(!item){
        state.hoteli.push(hotel);
      }
    },

    setToken(state, token){
      state.token = token;
      localStorage.token = token;
    },

    removeToken(state){
      state.token = '',
      localStorage.token = '';
    },

    setUsername(state, username){
      state.username = username;
      localStorage.username = username;
    },

    removeUsername(state){
      state.username = '';
      localStorage.username = '';
    },

    addTipoviSoba(state, tipovi){
      state.tipoviSoba = tipovi;
    },

    addSobeIds(state, ids){
      state.sobeIds = ids;
    },

    addSoba(state, soba){
      const item = state.sobe.filter( item => item.id == soba.id )[0];
      if(!item){
        state.sobe.push(soba);
      }
    },

    addKorisnik(state, korisnik){
      state.korisnik = korisnik;
    },

    addRezervacije(state, rezervacije){
      state.rezervacije = rezervacije;
    },

    addKomentar(state, obj){
      const image = state.hoteli.filter( item => item.id == obj.hotelId )[0];
      if (image) {
        image.komentari.push(obj);
      }
    },

    addRezervacijaToSoba(state, obj){
      const soba = state.sobe.filter( item => item.id == obj.sobaId )[0];
      if(soba){
        soba['rezervacije'].push(obj);
        state.rezervacije.push(obj);
      }
    }

  },
  actions: {

    //Rezervacija
    fetchRezervacijeByKorisnik( {commit, state}, id ){
      fetch(`http://127.0.0.1:8500/rezrevacije/byKorisnik/${id}`, {
        headers: { 'Authorization': `Bearer ${state.token}` }
      })
      .then( obj => obj.json() )
        .then( res => {
          commit('addRezervacije', res) ;
        });
    },    

    postRezervacija( {commit, state}, obj ){
      const username = obj.username;
      fetch('http://127.0.0.1:8500/rezervacije/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
         },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( rezervacija => {
          if(!rezervacija['err']){
            alert('Rezervisano!');
            commit('addRezervacijaToSoba', rezervacija);
          }
        });
    },

    //Korisnik
    fetchKorisnikByUsername( {commit, state}, username ){
      fetch(`http://127.0.0.1:8500/korisnici/byUsername/${username}`, {
        headers: { 'Authorization': `Bearer ${state.token}` }
      })
      .then( obj => obj.json() )
        .then( res => {
          commit('addKorisnik', res) ;
          fetch(`http://127.0.0.1:8500/rezervacije/byKorisnik/${res.id}`, {
            headers: { 'Authorization': `Bearer ${state.token}` }
          })
          .then( obj => obj.json() )
            .then( rez => {
              commit('addRezervacije', rez) ;
            });
        });
    },

    isUsernameAvailable({ commit }, username) {
      return new Promise( (resolve, reject) => {
        fetch(`http://127.0.0.1:8500/korisnici/isSlobodan/${username}`)
        .then( res => res.json() )
        .then( slobodan => {
          resolve(slobodan);
        });
      })
    },

    updateKorisnik( {commit, state}, obj ){
      const username = obj.username;
      fetch(`http://127.0.0.1:8500/korisnici/${obj.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.token}`
         },
        body: JSON.stringify(obj.form)
      }).then( res => res.json() )
        .then( korisnik => {
          if(!korisnik['err']){
            commit('setUsername', obj.form.username);
            commit('addKorisnik', obj.form);
          }else{
            alert(korisnik['err'])
          }
        });
    },

    //Rezervacija
    fetchKorisnikUsernameById( {commit, state}, id ){
      fetch(`http://127.0.0.1:8500/korisnici/username/byId/${id}`, {
        headers: { 'Authorization': `Bearer ${state.token}` }
      })
      .then( obj => obj.json() )
        .then( res => {0
          commit('addKorisnikUsernameToKomentar', res) ;
        });
    },    

    //Tipovi soba

    fetchTipoviSoba({ commit }){
      fetch('http://127.0.0.1:8500/tipoviSoba')
        .then( obj => obj.json() )
          .then( res => {
            commit('addTipoviSoba', res) ;
          });
    },

    //Gradovi

    fetchGradovi({ commit }){
      fetch('http://127.0.0.1:8500/gradovi')
        .then( obj => obj.json() )
          .then( res => {
            commit('addGradovi', res) ;
          });
    },

    //Sobe
    fetchSobeIdsByHotel({ commit }, id){
      fetch(`http://127.0.0.1:8500/sobe/byHotel/${id}`)
      .then( obj => obj.json() )
        .then( res => {
          commit('addSobeIds', res) ;
        });
    },  

    getSoba({ commit, state }, id){
      return new Promise( (resolve, reject) => {
        const item = state.sobe.filter( item => item.id == id )[0];
        if(item) {
          resolve(item);
        }else{
          fetch(`http://127.0.0.1:8500/sobe/${id}`)
          .then( obj => obj.json() )
          .then( res => {
            const soba = res;
            fetch(`http://127.0.0.1:8500/slike/bySoba/${id}`)
            .then( obj => obj.json() )
            .then(slike => {
              const s = slike;
              soba['slike'] = s;
              const item = state.tipoviSoba.filter( item => item.id == soba['tipSobeId'] )[0];
              soba['tipSobe'] = item.tip;

              commit('addSoba', soba);
              resolve(soba);
            })
          })
        }
      } )
    },

    //Hoteli

    fetchHoteliIds({ commit }){
      fetch('http://127.0.0.1:8500/hoteli/all/ids')
      .then( obj => obj.json() )
        .then( res => {
          commit('addHoteliIds', res) ;
        });
    },
    
    fetchHoteliIdsByGrad({ commit }, id){
      fetch(`http://127.0.0.1:8500/hoteli/byGrad/${id}`)
      .then( obj => obj.json() )
        .then( res => {
          commit('addHoteliIds', res) ;
        });
    },    

    fetchHoteliIdsByNaziv({ commit }, naziv){
      fetch(`http://127.0.0.1:8500/hoteli/byNaziv/${naziv}`)
      .then( obj => obj.json() )
        .then( res => {
          commit('addHoteliIds', res) ;
        });
    },
    
    fetchHoteliIdsByCenaSobeMin({ commit }, cena){
      fetch(`http://127.0.0.1:8500/hoteli/byCenaSobeMin/${cena}`)
      .then( obj => obj.json() )
        .then( res => {
          commit('addHoteliIds', res) ;
        });
    },
    
    fetchHoteliIdsByCenaSobeMax({ commit }, cena){
      fetch(`http://127.0.0.1:8500/hoteli/byCenaSobeMax/${cena}`)
      .then( obj => obj.json() )
        .then( res => {
          commit('addHoteliIds', res) ;
        });
    },
    
    fetchHoteliIdsByCenaSobeRange({ commit }, obj ){
      fetch(`http://127.0.0.1:8500/hoteli/byCenaSobeRange/${obj.cena1}/${obj.cena2}`)
      .then( obj => obj.json() )
        .then( res => {
          commit('addHoteliIds', res) ;
        });
    },

    getHotel({ commit, state }, id){
      return new Promise( (resolve, reject) => {
        const item = state.hoteli.filter( item => item.id == id )[0];
        if(item) {
          resolve(item);
        }else{
          fetch(`http://127.0.0.1:8500/hoteli/${id}`)
          .then( obj => obj.json() )
          .then( res => {
            const hotel = res;
            fetch(`http://127.0.0.1:8500/slike/byHotel/${id}`)
            .then( obj => obj.json() )
            .then(slike => {
              const s = slike;
              hotel['slike'] = s;
              fetch(`http://127.0.0.1:8500/komentari/byHotel/${id}`, {
                headers: { 'Authorization': `Bearer ${state.token}` }})
              .then( obj => obj.json() )
              .then(komentari => {
                hotel['komentari'] = komentari;
                commit('addHotel', hotel);
                resolve(hotel);
              })
            })
          })
        }
      } )
    },

    fetchHoteliByTipSobe({ commit }, naziv){
      fetch(`http://127.0.0.1:8500/hoteli/byTipSobe/${naziv}`)
      .then( obj => obj.json() )
        .then( res => {
          commit('addHoteliIds', res) ;
        });
    },

    //Auth

    register({ commit }, obj) {
      const username = obj.username;
      fetch('http://127.0.0.1:9000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          commit('setToken', tkn.token);
          commit('setUsername', username);
        });
    },

    login({ commit }, obj) {
      return new Promise( (resolve, reject) => {
        const username = obj.username;
        fetch('http://127.0.0.1:9000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          if (tkn.token) {
            commit('setToken', tkn.token);
            commit('setUsername', username);
          } else {
            alert(tkn.msg);
          }
          resolve(tkn);
        });
      })
    },

    //Socket
    socket_comment({ commit }, msg) {
      const comment = JSON.parse(msg);
        commit('addKomentar', comment);
    }

  },
  modules: {
  }
})

