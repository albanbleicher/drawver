import Vue from 'vue';

const store = new Vue({
  data: {
    songData:{},
    result:''
  },
  methods: { 
      setData(cover,title,artist,url,deezer) {
        this.songData= {
            cover:cover,
            title:title,
            artist:artist,
            url:url,
            deezer:deezer
        }
        console.log('songData is set to', this.songData) 
      },
      getData() {
        return this.songData
      }
  }
})
export default store;
