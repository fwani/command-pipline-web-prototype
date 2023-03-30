import {isEmpty} from "@/util/functions";

const state = () => ({
    sortedFields: [{name: "", direction: "+"}],
    groupFields: [{name: ""}],
    limit: null,
})

export default {
    namespaced: true,
    state: state,
    getters: {
        getSortedFields: state => state.sortedFields,
        getGroupFields: state => state.groupFields,
        getLimit: state => state.limit,
        generate: state => {
            const selectedFields = state.sortedFields.filter(x => !isEmpty(x.name));
            if (selectedFields.length === 0) return ""

            let command = "sort ";
            if (state.limit !== null && state.limit >= 0)
                command += state.limit + " "

            command += selectedFields.map(x => {
                return x.direction + "`" + x.name + "`"
            }).join(", ")

            const groupFields = state.groupFields.filter(x => x.name !== "");
            if (groupFields.length > 0)
                command += " by " + groupFields.map(x => x.name).join(", ")
            return command
        }
    },
    mutations: {
        updateLimit: (state, limit) => state.limit = limit,
        addSortedField: (state) => {
            state.sortedFields.push({name: "", direction: "+"})
        },
        addGroupField: (state) => {
            state.groupFields.push({name: ""})
        },
        removeSortedField: (state, idx) => {
            if (idx > 0) state.sortedFields.splice(idx, 1)
        },
        removeGroupField: (state, idx) => {
            if (idx > 0) state.groupFields.splice(idx, 1)
        }
    },
}