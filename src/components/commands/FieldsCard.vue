<template>
  <h2 class="text-left pb-10">fields 명령어 인자</h2>
  <v-radio-group v-model="picked" inline>
    <v-radio label="선택 컬럼 보기" value="+"></v-radio>
    <v-radio label="선택 컬럼 빼기" value="-"></v-radio>
  </v-radio-group>
  <div v-for="(field,idx) in fields" v-bind:key="field">
    <v-row>
      <v-col cols="5.5">
        <v-text-field label="필드명 입력" v-model="field.name"></v-text-field>
      </v-col>
      <v-col cols="5.5">
        <v-text-field label="별명 입력" v-model="field.alias"></v-text-field>
      </v-col>
      <v-col cols="1">
        <ButtonPlusMinus v-if="idx!==0" v-on:click="minusField(idx)" :icon="false"></ButtonPlusMinus>
      </v-col>
    </v-row>
  </div>
  <ButtonPlusMinus v-on:click="addField" :icon="true"></ButtonPlusMinus>
</template>

<script>
import ButtonPlusMinus from "@/components/ButtonPlusMinus";

export default {
  name: "FieldsCard",
  components: {ButtonPlusMinus},
  data: () => {
    return {
      fields: [{name: "", alias: ""}],
      isExclude: false,
      picked: "+",
    }
  },
  methods: {
    addField() {
      this.fields.push({name: "", alias: ""})
    },
    minusField(idx) {
      if (idx > 0) this.fields.splice(idx, 1)
    },
    generate() {
      this.$emit('generated-syntax', this.makeCommand)
    }
  },
  computed: {
    makeCommand() {
      const selectedFields = this.fields.filter(x => x.name !== "");
      if (selectedFields.length === 0) return ""
      return "fields " + this.picked + " " + selectedFields.map(x => {
        if (x.alias !== "")
          return x.name + " as `" + x.alias + "`"
        else
          return x.name
      }).join(", ")
    }
  }
}
</script>

<style scoped>

</style>