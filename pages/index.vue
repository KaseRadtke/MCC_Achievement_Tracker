<template>
  <div class="container">

          <WelcomePage v-if="valid_user_response"/>

          <!--<video autoplay muted loop id="myVideo">
          <source src="default.mp4" type="video/mp4">
          Your browser does not support HTML5 video.
          </video> -->


    
  </div>
</template>

<script>
export default {

 head() {
        return {
            title:'MCC - Achievement Tracker',
            meta: [{
                hid: 'description',
                name: 'description',
                content: 'Track and get guides for all 700 achievements in Halo: The Master Chief Collection'
            }]
        }
    },

  data() {
  return { valid_user_response : true }
  }

}
</script>

<style>

body {
  background-color: #28347a;
}
#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%; 
  min-height: 100%;
  z-index: -100;
}

</style>
