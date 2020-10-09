<template>
  <div id="mainpage">
    <div>
      <Gamesbar @gameSelected="gameSelected"/>
    </div>

    <div id='wrapper'>
      <FilterAchievements :currentGame="this.game"/>
      <div id="achievements">
          <p> achievements </p>
      </div>
    </div>
     
  </div>
  
</template>

<script>

import Gamesbar from "../components/Gamesbar"
import FilterAchievements from "../components/FilterAchievements"
export default {

   components: {
        Gamesbar,
        FilterAchievements
    },

    data(){
      return{
        game: 'reach',
      }
    },

   mounted() {
    this.$nextTick(() => {
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
    
  },

  methods: {
    gameSelected(selectedGame) {
      this.game = selectedGame
    }
  }

}
</script>

<style>
 
   #achievements {
    grid-column: 2/3;
    grid-row: 1/11;
    margin-top: 2em;
    background-color: blue;

  }

  #mainpage {
          border: rgb(230, 230, 230) solid 2px;
          border-radius: 15px;
          margin: 0 auto;
          width: 110rem;
          height: 72rem;
          overflow: auto;
          min-width: 10vh;
          justify-content: center;
          align-items: center;  
          background-color:rgba(0,0, 0, 0.5);
          backdrop-filter: blur(10px);
  }

  #wrapper {
    display:grid;
    grid-template-columns:1fr 3fr;
    grid-auto-rows:minmax(100px, auto);
    margin-top: 1em;
  }

</style>