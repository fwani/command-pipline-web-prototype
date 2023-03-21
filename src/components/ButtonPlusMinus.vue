<template>
  <v-btn
      variant="outlined"
      size="small"
      icon
      color="info"
  >
    <v-icon v-if="!icon">mdi-minus</v-icon>
    <v-icon v-if="icon">mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "ButtonPlusMinus",
  props: {
    icon: Boolean
  }
}
</script>

<style scoped>

</style>