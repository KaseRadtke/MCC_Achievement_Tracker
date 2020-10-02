<template>
  <div id='filter_achievements'>
   <div id='search'>
        <div class="search_header"><p> Search Criteria </p> </div>
        <b-form @submit.prevent="onSubmit">
            <div class="form-group mx-sm-3 mb-2" style="flex-flow: nowrap;">
                <b-input type="text" class="form-control" id="achievement_search" placeholder='Search for specific achievement'></b-input>
                <b-button variant="primary" type="submit" value="Search Achievements">Find Achievement</b-button>
            </div>
        </b-form>
    </div>
    <div class="form-check" v-show="reach == 'kase'">
      <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1" v-show="reach">
        Default checkbox
      </label>
    </div>
  </div>
</template>

<script>
export default {
name: 'FilterAchievements',

props:{
        game: String,
    },

data(){
        return{
            reach: 'kase'
        }
    },

}
</script>

<style>
  #search {
    background-color: violet;
  }

  .search_header{
    text-align: left;
    color: white;
    padding-left: 2em;
    margin-top: 2em;
  }
 #filter_achievements {
    background-color: green;
    grid-column: 1;
    grid-row: 1/11;
  }

  .header{
    color: white;
  }
</style>