<template>
  <h2 class="text-left pb-10">top 명령어 인자</h2>
  <v-text-field label="상위 N 개 (default: 100)" v-model="limit" type="number"></v-text-field>
  <v-row>
    <v-col>
      <v-text-field label="필드명 입력" v-model="sortedField.name"></v-text-field>
    </v-col>
    <v-col cols="3">
      <v-radio-group v-model="sortedField.direction" inline>
        <v-radio label="오름차순 (ASC)" value="+"></v-radio>
        <v-radio label="내림차순 (DESC)" value="-"></v-radio>
      </v-radio-group>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "FieldsCard",
  props: {
    moduleName: {
      type: String,
      required: true
    },
    moduleType: {
      type: Number,
      default: 0  // 0: syntax, 1: pipeline
    }
  },
  data: () => {
    return {
      sortedField: {name: "", direction: "+"},
      limit: 100,
    }
  },
  methods: {
    generate() {
      this.$emit('generated-syntax', this.makeCommand)
    }
  },
  computed: {
    makeCommand() {
      if (this.sortedField.name === "") return ""

      let command = "top ";
      if (this.limit !== null && this.limit >= 0)
        command += this.limit + " "
      command += this.sortedField.direction + "`" + this.sortedField.name + "`"
      return command
    }
  }
}
</script>

<style scoped>

</style>