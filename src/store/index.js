import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuidv4 } from 'uuid'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        allLists: [],
        lastListId: 0,
        fromId: 0,
    },

    actions: {},

    mutations: {
        setLastListId(state, id) {
            state.lastListId = id
            // console.log(state)
        },

        setFromListId(state, id) {
            state.fromId = id
        },

        migrateCard(state, cardId) {
            let fromList = state.allLists.find(list => list.id == state.fromId)
            let toList = state.allLists.find(list => list.id == state.lastListId)
            let itemIndex = fromList.cards.findIndex(item => item.id == cardId)

            toList.cards.push(fromList.cards[itemIndex])
            fromList.cards.splice(itemIndex, 1)
            // console.log(cardId, "||", state.fromId, "||", state.lastListId)
        },

        setLists(state, data) {
            state.allLists = data
        },

        addNewList(state){
            state.allLists.push({
                id: uuidv4(),
                cards: [],
            })
        },
        
        getCardItem(state, id) {
            return state.allLists.find(item => item.id === id)
        },

        addNewCard(state, listId){
            let currentList = state.allLists.find(item => item.id === listId)

            currentList.cards.push({
                id: uuidv4(),
                value: ''
            })
        },
        
        getValueCard(state, data){
            let currentAllList = state.allLists.find(item => item.id === data.idList)
            let currentCard = currentAllList.cards.find(item => item.id === data.id)
            currentCard.value = data.value
        }
    },

    getters: {},

    modules:{},
})