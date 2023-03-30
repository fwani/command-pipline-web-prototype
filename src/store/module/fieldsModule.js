import {isEmpty} from "@/util/functions";

const state = () => ({
    fields: [
        {name: "", alias: ""}
    ],
    picked: '+',
})

export default {
    namespaced: true,
    state: state,
    getters: {
        getFields: state => state.fields,
        // fields: state => state.fields,
        getPicked: state => state.picked,
        generate: state => {
            console.log("generate fields")
            const selectedFields = state.fields.filter(x => !isEmpty(x.name));
            if (selectedFields.length === 0) return ""
            return "fields " + state.picked + " " + selectedFields.map(x => {
                if (x.alias !== "")
                    return "`" + x.name + "` as `" + x.alias + "`"
                else
                    return "`" + x.name + "`"
            }).join(", ")
        }
    },
    mutations: {
        updatePicked: (state, picked) => state.picked = picked,
        addField: (state) => {
            state.fields.push({name: "", alias: ""})
        },
        removeField: (state, idx) => {
            if (idx > 0) state.fields.splice(idx, 1)
        }
    },
}