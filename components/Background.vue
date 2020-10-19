<template>
  <div>
      <video-background 
            :src="currentVideo"
            style="max-height: 100vh; height: 100vh;" 
            >
      </video-background>
  </div>
</template>

<script>

export default {
name: 'Background',
    mounted (){
        let VideoBackground

        if (process.client) {
        VideoBackground = require('vue-responsive-video-background-player');
        }

    },

    data() {
    return {
      currentVideo: "/test.mp4"
    };
  },

    
}
</script>

<style>

</style>