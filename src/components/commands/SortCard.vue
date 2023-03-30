<template>
  <h2 class="text-left pb-10">sort 명령어 인자</h2>
  <v-text-field label="정렬 후 limit 개수 (default: -1)" v-model="limit" type="number"></v-text-field>

  <div class="pl-5 pr-5 pt-2 pb-2 mb-10 border-md">
    <h3 class="text-left pb-10">그룹 필드</h3>
    <div v-for="(field,idx) in getGroupFields" v-bind:key="field">
      <v-row>
        <v-col>
          <v-text-field label="필드명 입력" v-model="field.name"></v-text-field>
        </v-col>
        <v-col cols="1">
          <ButtonPlusMinus v-if="idx!==0" v-on:click="removeGroupField(idx)" :icon="false"></ButtonPlusMinus>
        </v-col>
      </v-row>
    </div>
    <ButtonPlusMinus v-on:click="addGroupField" :icon="true"></ButtonPlusMinus>
  </div>
  <div class="pl-5 pr-5 pt-2 pb-2 mb-10 border-md">
    <h3 class="text-left pb-10">정렬 필드</h3>
    <div v-for="(field,idx) in getSortedFields" v-bind:key="field">
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
          <ButtonPlusMinus v-if="idx!==0" v-on:click="removeSortedField(idx)" :icon="false"></ButtonPlusMinus>

        </v-col>
      </v-row>
    </div>
    <ButtonPlusMinus v-on:click="addSortedField" :icon="true"></ButtonPlusMinus>
  </div>
</template>

<script>
import ButtonPlusMinus from "@/components/ButtonPlusMinus";
import sortModule from "@/store/module/sortModule";

export default {
  name: "FieldsCard",
  components: {ButtonPlusMinus},
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
      limit: null,
    }
  },
  mounted() {
    this.limit = this.getLimit
  },
  created() {
    console.log("SortCard created : " + this.moduleName)
    if (!this.$store.hasModule(this.moduleName)) {
      console.log("Add SortModule")
      this.$store.registerModule(this.moduleName, sortModule)
    }
    if (this.moduleType === 0) {
      this.$store.commit('addCommandForSyntax', {
        command: this.moduleName,
      })
    } else {
      this.$store.commit('updatePipe', {
        moduleName: this.moduleName,
        command: 'sort',
      })
    }
  },
  methods: {
    addSortedField() {
      this.$store.commit(this.moduleName + '/addSortedField')
    },
    addGroupField() {
      this.$store.commit(this.moduleName + '/addGroupField')
    },
    removeSortedField(idx) {
      this.$store.commit(this.moduleName + '/removeSortedField', idx)
    },
    removeGroupField(idx) {
      this.$store.commit(this.moduleName + '/removeGroupField', idx)
    },
  },
  computed: {
    getSortedFields() {
      return this.$store.getters[this.moduleName + '/getSortedFields']
    },
    getGroupFields() {
      return this.$store.getters[this.moduleName + '/getGroupFields']
    },
    getLimit() {
      return this.$store.getters[this.moduleName + '/getLimit']
    },
  },
  watch: {
    limit: function (limit) {
      this.$store.commit(this.moduleName + '/updateLimit', limit)
    }
  }
}
</script>

<style scoped>

</style>