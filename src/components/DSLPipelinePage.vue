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
          v-for="(pipe,idx) in pipeline" v-bind:key="pipe"
          multiple
      >
        <v-expansion-panel :value="idx"
                           @drop.prevent="onDrop($event, idx)"
                           @dragenter.prevent
                           @dragover.prevent>
          <v-container fluid class="pa-0" @dragstart="startDrag($event, pipe, idx)"
                       draggable="true">
            <v-expansion-panel-title>
              <p>{{ pipe.command }}</p>
              <v-spacer/>
              <ButtonPlusMinus v-on:click="minusPipe(idx)" :icon="false"></ButtonPlusMinus>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-select
                  v-model="pipe.command"
                  :items="commands"
                  label="Command"
              ></v-select>

              <div class="pl-5 pr-5 pt-2 pb-2 mb-10 border-md">
                <FieldsCard v-if="pipe.command==='fields'" ref="commandCard"/>
                <TypecastCard v-if="pipe.command==='typecast'" ref="commandCard"/>
                <SortCard v-if="pipe.command==='sort'" ref="commandCard"/>
                <TopCard v-if="pipe.command==='top'" ref="commandCard"/>
              </div>
            </v-expansion-panel-text>
          </v-container>
        </v-expansion-panel>
      </v-expansion-panels>
      <ButtonPlusMinus v-on:click="addPipe" :icon="true"></ButtonPlusMinus>
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

export function uuidV4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

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
      panel: [0],
    }
  },
  methods: {
    generate() {
      const generatedList = [];
      for (let i = 0; i < this.$refs.commandCard.length; i++) {
        generatedList.push(this.$refs.commandCard[i].makeCommand)
      }
      this.generatedSyntax = generatedList.join(' | ')
    },
    all() {
      this.panel = [...this.pipeline.keys()]
    },
    none() {
      this.panel = []
    },
    addPipe() {
      this.pipeline.push({id: uuidV4(), command: null})
      this.panel.push(this.pipeline.length - 1)
    },
    minusPipe(idx) {
      if (idx > 0) this.pipeline.splice(idx, 1)
    },
    startDrag(event, item) {
      event.dataTransfer.dropEffect = "move"
      event.dataTransfer.effectAllowed = "move"
      event.dataTransfer.setData("selectedItem", item.id)
    },
    onDrop(event, idx) {
      const selectedItem = event.dataTransfer.getData("selectedItem")

      let targetIdx
      let targetItem
      this.pipeline.forEach((obj, index) => {
        if (obj.id === selectedItem) {
          targetIdx = index
          targetItem = obj
        }
      })
      console.info(idx + "  " + targetIdx)
      console.info(targetItem.id + "  " + this.pipeline.map(x => x.id).join(','))
      this.pipeline.splice(targetIdx, 1)
      this.pipeline.splice(idx, 0, targetItem)
    }
  },
}
</script>

<style scoped>

</style>