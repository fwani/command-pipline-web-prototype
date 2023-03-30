<template>

  <div class="text-center pa-10">
    <div class="mb-10">
      <div class="text-center d-flex pb-4">
        <v-btn class="ma-2" @click="all">
          All
        </v-btn>
        <v-btn class="ma-2" @click="none">
          None
        </v-btn>
      </div>

      <div class="pb-4">v-model {{ panel }}</div>

      <v-expansion-panels
          v-model="panel"
          multiple
      >
        <v-expansion-panel
            v-for="(pipe,idx) in getPipeLine()" v-bind:key="pipe"
            @drop.prevent="onDrop($event, idx)"
            @dragenter.prevent
            @dragover.prevent>
          <v-container fluid class="pa-0" @dragstart="startDrag($event, idx)"
                       draggable="true">
            <v-expansion-panel-title>
              <p>{{ pipe.command }}</p>
              <v-spacer/>
              <ButtonPlusMinus v-on:click="removePipe(pipe.id)" :icon="false" :disabled="idx===0"></ButtonPlusMinus>
            </v-expansion-panel-title>
            <v-expansion-panel-text>

              <v-select
                  v-model="pipe.command"
                  :items="commands"
                  label="Command"
              ></v-select>

              <div class="pl-5 pr-5 pt-2 pb-2 mb-10 border-md">
<!--                <component v-bind:is="getComponent"></component>-->
<!--                                <component v-bind:is="pipe.component" v-bind:module-name="`${pipe.command}-${pipe.id}`"-->
<!--                                           ref="commandCard"></component>-->
                <FieldsCard v-if="pipe.command==='fields'" :module-type="1"
                            :module-name="`${pipe.command}-${pipe.id}`"/>
                <TypecastCard v-if="pipe.command==='typecast'" :module-type="1"
                              :module-name="`${pipe.command}-${pipe.id}`"/>
                <SortCard v-if="pipe.command==='sort'" :module-type="1" :module-name="`${pipe.command}-${pipe.id}`"/>
                <TopCard v-if="pipe.command==='top'" :module-type="1" :module-name="`${pipe.command}-${pipe.id}`"/>
              </div>
            </v-expansion-panel-text>
          </v-container>
        </v-expansion-panel>
      </v-expansion-panels>
      <ButtonPlusMinus v-on:click="addNewPipe" :icon="true"></ButtonPlusMinus>
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
import ButtonPlusMinus from "@/components/ButtonPlusMinus";
import {uuidV4, isEmpty} from "@/util/functions";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "HomePage",

  components: {
    ButtonPlusMinus,
    FieldsCard,
    TypecastCard,
    SortCard,
    TopCard,
  },
  data: () => {
    return {
      pipeline: [{id: uuidV4(), command: null}],
      commands: [
        'fields',
        'typecast',
        'sort',
        'top',
      ],
      generatedSyntax: "",
      panel: [],
    }
  },
  computed: {
    ...mapGetters(['getPipeLine']),
  },
  methods: {
    ...mapMutations(['addPipe', 'removePipe']),
    addNewPipe() {
      this.addPipe()
      this.panel.push(this.getPipeLine().length - 1)
    },
    generate() {
      const generatedList = [];
      for (let pipe of this.getPipeLine()) {
        generatedList.push(this.$store.getters[`${pipe.command}-${pipe.id}/generate`])
      }
      console.log(generatedList)
      this.generatedSyntax = generatedList.filter(x => !isEmpty(x)).join(' | ')
    },
    all() {
      this.panel = [...this.getPipeLine().keys()]
      console.log(this.panel)
    },
    none() {
      this.panel = []
    },
    startDrag(event, idx) {
      event.dataTransfer.dropEffect = "move"
      event.dataTransfer.effectAllowed = "move"
      event.dataTransfer.setData("selectedIdx", idx)
    },
    onDrop(event, idx) {
      console.log(idx)
      const selectedIdx = event.dataTransfer.getData("selectedIdx")
      this.$store.commit('switchPipe', {selectedIdx: selectedIdx, targetIdx: idx})
    }
  },
}
</script>

<style scoped>

</style>