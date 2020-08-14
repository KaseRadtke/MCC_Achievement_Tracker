<template>
    <div>
        <form @submit.prevent="onSubmit">
            <input type="text" v-model="text" placeholder='Enter Xbox LIVE Gamertag'>
            <input type="submit" value="Search Achievements">
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