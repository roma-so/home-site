<template>
  <section class="home">
    <the-scene />
    <the-footer />
  </section>
</template>

<script>
import TheFooter from '~/components/TheFooter.vue';
import TheScene from '~/components/TheScene.vue';

export default {
  components: {
    TheFooter,
    TheScene
  }
}
</script>

<style lang="sass">
.home
  position: relative
  min-height: 700vh
</style>
