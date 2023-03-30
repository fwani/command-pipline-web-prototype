import {createStore} from "vuex";
import {isEmpty, uuidV4} from "@/util/functions";

export default createStore({
    state: {
        pipeline: [],
        syntax: []
    },
    getters: {
        // pipeline
        getPipeLine: (state) => () => state.pipeline,
        getPipe: (state) => (idx) => state.pipeline[idx],
        getParamsOfPipeById: (state) => (id) => state.pipeline.filter(x => x.id === id)[0].params,
    },
    mutations: {
        addPipe(state) {
            const id = uuidV4()
            state.pipeline.push({
                id: id,
                command: null,
                component: null,
            })
            console.info("New pipe added: " + id)
            console.info("pipeline: " + state.pipeline)
        },
        removePipe(state, id) {
            state.pipeline = state.pipeline.filter(x => x.id !== id)
            console.info("Remove pipe: " + id)
        },
        updatePipe(state, {moduleName, command}) {
            console.info("update pipe: " + moduleName)
            state.pipeline = state.pipeline.map(x => {
                if (moduleName.endsWith(x.id) && x.command !== command) {
                    x.command = command
                    const tag = command.capitalize() + "Card"
                    x.component = () => import(`@/components/commands/${tag}.vue`)
                }
                return x
            })
            console.info("pipeline: " + state.pipeline)
        },
        switchPipe(state, {selectedIdx, targetIdx}) {
            if (isEmpty(targetIdx) || selectedIdx === targetIdx) return
            const selected = state.pipeline[selectedIdx]
            if (selectedIdx < targetIdx) {
                state.pipeline.splice(targetIdx + 1, 0, selected)
                state.pipeline.splice(selectedIdx, 1)
            } else {
                state.pipeline.splice(selectedIdx, 1)
                state.pipeline.splice(targetIdx, 0, selected)
            }
        },
        removeCommand(state, id) {
            state.pipeline = state.pipeline.filter(x => x.id !== id)
        },
        addCommandForSyntax(state, {command}) {
            if (state.syntax.indexOf(command) < 0) {
                console.log("add syntax: " + command)
                state.syntax.push(command)
            }
        },

    },
    // modules: {
    //     fields: fieldsModule
    // }
});
