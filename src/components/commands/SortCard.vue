<template>
  <h2 class="text-left pb-10">sort 명령어 인자</h2>
  <v-text-field label="정렬 후 limit 개수 (default: -1)" v-model="limit" type="number"></v-text-field>

  <div class="pl-5 pr-5 pt-2 pb-2 mb-10 border-md">
    <h3 class="text-left pb-10">그룹 필드</h3>
    <div v-for="(field,idx) in groupFields" v-bind:key="field">
      <v-row>
        <v-col>
          <v-text-field label="필드명 입력" v-model="field.name"></v-text-field>
        </v-col>
        <v-col cols="1">
          <ButtonPlusMinus v-if="idx!==0" v-on:click="minusGroupField(idx)" :icon="false"></ButtonPlusMinus>
        </v-col>
      </v-row>
    </div>
    <ButtonPlusMinus v-on:click="addGroupField" :icon="true"></ButtonPlusMinus>
  </div>
  <div class="pl-5 pr-5 pt-2 pb-2 mb-10 border-md">
    <h3 class="text-left pb-10">정렬 필드</h3>
    <div v-for="(field,idx) in sortedFields" v-bind:key="field">
      <v-row>
        <v-col cols="8">
          <v-text-field label="필드명 입력" v-model="field.name"></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-radio-group v-model="field.direction" inline>
            <v-radio label="오름차순 (ASC)" value="+"></v-radio>
            <v-radio label="내림차순 (DESC)" value="-"></v-radio>
          </v-radio-group>
        </v-col>
        <v-col cols="1">
          <ButtonPlusMinus v-if="idx!==0" v-on:click="minusSortedField(idx)" :icon="false"></ButtonPlusMinus>

        </v-col>
      </v-row>
    </div>
    <ButtonPlusMinus v-on:click="addSortedField" :icon="true"></ButtonPlusMinus>
  </div>
</template>

<script>
import ButtonPlusMinus from "@/components/ButtonPlusMinus";

export default {
  name: "FieldsCard",
  components: {ButtonPlusMinus},
  data: () => {
    return {
      sortedFields: [{name: "", direction: "+"}],
      groupFields: [{name: ""}],
      limit: null,
    }
  },
  methods: {
    addSortedField() {
      this.sortedFields.push({name: "", direction: "+"})
    },
    addGroupField() {
      this.groupFields.push({name: ""})
    },
    minusSortedField(idx) {
      if (idx > 0) this.sortedFields.splice(idx, 1)
    },
    minusGroupField(idx) {
      if (idx > 0) this.groupFields.splice(idx, 1)
    },
    generate() {
      this.$emit('generated-syntax', this.makeCommand)
    }
  },
  computed: {
    makeCommand() {
      const selectedFields = this.sortedFields.filter(x => x.name !== "");
      if (selectedFields.length === 0) return ""

      let command = "sort ";
      if (this.limit !== null && this.limit >= 0)
        command += this.limit + " "

      command += selectedFields.map(x => {
        return x.direction + "`" + x.name + "`"
      }).join(", ")

      const groupFields = this.groupFields.filter(x => x.name !== "");
      if (groupFields.length > 0)
        command += " by " + groupFields.map(x => x.name).join(", ")
      return command
    }
  }
}
</script>

<style scoped>

</style>