<template>
  <div>
    <Nuxt/>
    <Background id='background_default'/>
  </div>
</template>

<script>
import Background from '../components/Background'

export default {
  components: {
    Background
  }
}
</script>

<style>

  html {
    font-family:
      'Source Sans Pro',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  body {
    background-color: #2e3038;
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
  }
 #background_default{
   position: relative;
 }
</style>
