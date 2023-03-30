<template>
  <h2 class="text-left pb-10">fields 명령어 인자</h2>
  <v-radio-group v-model="picked" inline>
    <v-radio label="선택 컬럼 보기" value="+"></v-radio>
    <v-radio label="선택 컬럼 빼기" value="-"></v-radio>
  </v-radio-group>
  <div v-for="(field,idx) in getFields" v-bind:key="field">
    <v-row>
      <v-col cols="5.5">
        <v-text-field label="필드명 입력" v-model="field.name"></v-text-field>
      </v-col>
      <v-col cols="5.5">
        <v-text-field label="별명 입력" v-model="field.alias" :disabled="getPicked === '-'"></v-text-field>
      </v-col>
      <v-col cols="1">
        <ButtonPlusMinus v-if="idx!==0" v-on:click="removeField(idx)" :icon="false"></ButtonPlusMinus>
      </v-col>
    </v-row>
  </div>
  <ButtonPlusMinus v-on:click="addField" :icon="true"></ButtonPlusMinus>
</template>

<script>
import ButtonPlusMinus from "@/components/ButtonPlusMinus";
import fieldsModule from "@/store/module/fieldsModule";
import {mapMutations} from "vuex";

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
  data() {
    return {
      picked: ''
    }
  },
  mounted() {
    this.picked = this.getPicked
  },
  created() {
    console.log("FieldCard created : " + this.moduleName)
    if (!this.$store.hasModule(this.moduleName)) {
      console.log("Add FieldModule")
      this.$store.registerModule(this.moduleName, fieldsModule)
    }
    if (this.moduleType === 0) {
      this.$store.commit('addCommandForSyntax', {
        command: this.moduleName,
      })
    } else {
      this.$store.commit('updatePipe', {
        moduleName: this.moduleName,
        command: 'fields',
      })
    }
  },
  methods: {
    ...mapMutations(['updatePipe']),
    removeField(idx) {
      this.$store.commit(this.moduleName + '/removeField', idx)
    },
    addField() {
      this.$store.commit(this.moduleName + '/addField')
    },
  },
  computed: {
    getFields() {
      return this.$store.getters[this.moduleName + '/getFields']
    },
    getPicked() {
      return this.$store.getters[this.moduleName + '/getPicked']
    },
  },
  watch: {
    picked: function (picked) {
      this.$store.commit(this.moduleName + '/updatePicked', picked)
    }
  }
}
</script>

<style scoped>

</style>