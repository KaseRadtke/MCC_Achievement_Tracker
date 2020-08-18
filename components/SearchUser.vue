<template>
    <div>
        <form @submit.prevent="onSubmit" class="form-inline">
            <div class="form-group mx-sm-3 mb-2">
                <input type="text" v-model="text" class="form-control" placeholder='Enter Xbox LIVE Gamertag'>
            </div>
            <input type="submit" value="Search Achievements" class="btn btn-primary mb-2">
        </form>
    </div>
  
</template>

<script>
export default {

    name: 'SearchUser',

    data () {
        return {
            text: ''
        }

    },

    methods: {

        onSubmit() {
            this.$emit('search-user', this.text);
            this.text="";
        }
    }

}
</script>

<style>

</style>