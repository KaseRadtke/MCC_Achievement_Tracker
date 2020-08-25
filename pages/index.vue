<template>
  <div class="container" id="welcomeContainer">
          <WelcomePage/>
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
}
</script>

<style>
body {
  background-color: #2e3038;
}

#welcomeContainer{
  padding-top: 200px;
}
</style>
