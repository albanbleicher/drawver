<template>
  <div class="home">
    <h3>drawver</h3>
    <transition name="fade">
    <form v-if='!songFound' @submit.prevent='handleForm'>
      <input type="text"  placeholder="search for a song" v-model='query'>
    </form>
    </transition>

    <transition name="fade">
    <span v-if='isSearching'>searching...</span>
    </transition>
    <transition name="fade">
    <div v-if='songFound'>
      <div class="soundCard">
        <img :src="store.songData.cover" :alt="store.songData.title">
      <div class='cardContent'>
        <h3>{{store.songData.title}}</h3>
      <p>{{store.songData.artist}}</p>
      <router-link to="/generate">continue ></router-link> 
      </div>
      </div>
      <a class='other' @click='again'>search for another song</a> <br>

    </div>
    <div id="canvas"></div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store';
import router from '../router'
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      query:'',
      isSearching:false,
      songFound:false,
      store
    }
  },
  methods: {
    handleForm() {
      this.isSearching=true;
      axios.get('https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/track?q='+this.query).then((response) => {
        let data = response.data.data[0];
        axios.get('https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/'+data.id).then((track) =>{console.log(track)}).catch((e)=>console.log(e))
        store.setData(data.album.cover_medium,data.title,data.artist.name,data.preview,'https://deezer.com/track/'+data.id)
        this.isSearching=false;
        this.songFound=true;
      })
    },
    again() {
      this.songFound = false;
      this.query='';
    }  
  }
}
</script>
