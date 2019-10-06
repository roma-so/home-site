<template>
  <div class="footer">
    <div class="footer--link">
      <a href="https://github.com/roma-so">
        <img
          class="footer--link-img"
          src="~/assets/img/icons/github.svg">
      </a>
    </div>
    <div class="footer--link">
      <a href="mailto:romandkos@gmail.com">
        <img
          class="footer--link-img"
          src="~/assets/img/icons/gmail.svg">
      </a>
    </div>
  </div>
</template>

<script>
  
</script>

<style lang="sass">
.footer
  justify-content: center
  padding: 20px 0 40px
  align-items: center
  position: absolute
  display: flex
  width: 100%
  bottom: 40vh
  left: 0

  &--link
    margin: 0 3vh
    &-img
      width: 10vh
</style>
