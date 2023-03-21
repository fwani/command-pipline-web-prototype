<template>
  <h2 class="text-left pb-10">typecast 명령어 인자</h2>
  <div v-for="(field,idx) in fields" v-bind:key="field">
    <v-row>
      <v-col cols="4">
        <v-text-field label="필드명 입력" v-model="field.name"></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-select
            v-model="field.type"
            :items="irisTypes"
            label="Command"
        ></v-select>
      </v-col>
      <v-col cols="4">
        <v-text-field v-if="field.type==='TIMESTAMP' || field.type==='DATE'" label="데이터 포멧 입력 (YYYY-MM-DD HH:mm:ss)"
                      v-model="field.format"></v-text-field>
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
      irisTypes: ['TEXT', 'INTEGER', 'BIGINT', 'REAL', 'TIMESTAMP', 'DATE'],
      fields: [{name: "", type: "TEXT", format: ""}],
    }
  },
  methods: {
    addField() {
      this.fields.push({name: "", type: "TEXT", format: ""})
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
      return "typecast " + selectedFields.map(x => {
        const field = "'" + x.name + "' " + x.type;
        if ((x.type === "TIMESTAMP" || x.type === "DATE") && x.format !== "")
          return field + " \"" + x.format + "\""
        else
          return field
      }).join(", ")
    }
  }
}
</script>

<style scoped>

</style>