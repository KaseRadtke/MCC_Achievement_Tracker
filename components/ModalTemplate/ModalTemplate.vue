<template src='./template.html'></template>
<style src='./style.css'></style>

<script>
export default {
    props: ['show'],
    
    mounted: function () {
        document.addEventListener("keydown", (e) => {
            if (this.show && e.keyCode == 27) {
                this.close()
            }
        })
    },
    
    methods: {
        close: function() {
            this.$emit('close')
        }
    }
}
</script>