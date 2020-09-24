<template>
    <div class="result">
        <h1>woowwww ! looks goooddd!</h1>
        <img :src="store.result" alt="">
        <h3>{{store.songData.title}}</h3>
        <p>{{store.songData.artist}}</p>
        <a :href="store.songData.deezer" target="_blank" class="play">listen on <img src="https://upload.wikimedia.org/wikipedia/commons/d/db/Deezer_logo.svg" alt="deezer"></a>
        <a class="see" target='_blank' href="http://localhost:3001/experiment">see gallery</a>
    </div>
</template>
<script>
import store from '../store';
import router from '../router';
export default {
    data() {
        return {
            store
        }
    },
    mounted() {
        if(!store.result) {
            router.push('/')
        }
        else {
            console.log(store.songData)
              // envoi sur express
               const formData = new FormData()
            formData.append('title', store.songData.title+' by '+ store.songData.artist)
            formData.append('file', store.result)
var request = new XMLHttpRequest();
request.open("POST", "http://localhost:3001/experiment");
request.send(formData);
        }
    }
}
</script>