<template>
    <transition name="modal">
        <div class="modal-mask" @click.stop="close" v-if="show">
            <div class="modal-container">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

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

<style scoped>
* {
    box-sizing: border-box;
}
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
    transition: opacity .8s ease;
    overflow-x: auto;
}
.modal-container {
   width: 55em;
    height: 65em;
    margin: 0px auto;
    margin-top: 3em;
    padding: 20px 30px;
   background: rgb(10,35,46);
background: linear-gradient(174deg, rgba(10,35,46,1) 0%, rgba(0,0,0,0.835171568627451) 100%);
    border-radius: 25px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .8s ease;
    border: #255166 solid 2px;
}
.modal-body {
    margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}
.modal-leave-active {
  opacity: 0;
}
.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>