<template>
  <div class="text-center pa-10">
    <v-select
        v-model="command"
        :items="commands"
        label="Command"
    ></v-select>

    <div class="pl-5 pr-5 pt-2 pb-2 mb-10 border-md">
      <FieldsCard v-if="command==='fields'" :module-type="0" :module-name="command"/>
      <TypecastCard v-if="command==='typecast'" :module-type="0" :module-name="command"/>
      <SortCard v-if="command==='sort'" :module-type="0" :module-name="command"/>
      <TopCard v-if="command==='top'" :module-type="0" :module-name="command"/>
    </div>

    <div>
      <v-btn class="mb-2" rounded="lg" color="primary" v-on:click="generate">명령어 구문 생성 하기</v-btn>
      <v-textarea
          bg-color="grey-lighten-2"
          color="cyan"
          label="Generating..."
          :model-value="generatedSyntax"
      ></v-textarea>
    </div>
  </div>
</template>

<script>
import FieldsCard from "@/components/commands/FieldsCard";
import TypecastCard from "@/components/commands/TypecastCard";
import SortCard from "@/components/commands/SortCard";
import TopCard from "@/components/commands/TopCard";

export default {
  name: "DSLSyntaxPage",

  components: {
    FieldsCard,
    TypecastCard,
    SortCard,
    TopCard,
  },
  data: () => {
    return {
      commands: [
        'fields',
        'typecast',
        'sort',
        'top',
      ],
      command: null,
      generatedSyntax: "",
    }
  },
  methods: {
    generate() {
      this.generatedSyntax = this.$store.getters[`${this.command}/generate`]
    }
  },
}
</script>

<style scoped>

</style>