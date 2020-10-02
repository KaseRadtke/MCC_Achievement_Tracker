<template>
  <div>
      <video-background 
            src="\default.mp4"
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

    }
}
</script>

<style>

</style>