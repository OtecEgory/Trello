<template>
    <div
        class="list"
        draggable
        @dragstart="dragStart"
        @dragend="dragend"
        @dragover="dragOver"
        @dragenter="handleDragEnter"
    >
    <div class="header-list">
        list
    </div>
        <input type="name-list" autocomplete="off">
        <div class="footer-list">
            <button>Add List</button>
                <div class="close">+</div>
            </div>
            <div 
                class="add-card"
               @click="$store.commit('addNewCard', id)"
            >
                add a card
            </div>
            <div class="wrap-card">
                <Card
                    v-for="item in cards"
                    :key="item.id" 
                    :id="item.id"
                    :dragStartCard="startDropCard"
                    :dragEndCard="endDropCard"
                    :handleDragOverCard="handleDragOverCard"
                    :listId="id"
                    :cardValue="item.value"
                />
            </div>
        </div>
</template>

<script>
import Card from './Card'
export default {
    props: {
        id: [String, Number],
        dragStart: Function,
        dragend: Function,
        dragOver: Function,
        cards: Array,
    },
    data: function() {
        return {
            lastListId: 0,
        }  
    },
    components: { Card },
    methods:{
        handleDragEnter() {
            this.$store.commit("setLastListId", this.id)
        },
        startDropCard(){
            this.$store.commit("setFromListId", this.id)
            event.currentTarget.classList.add('selected-card');
        },
        endDropCard(cardId){
            this.$store.commit("migrateCard", cardId)
            event.currentTarget.classList.remove('selected-card');
        },
        handleDragOverCard(e){
            let cardElenemt = e.currentTarget
            let activeElement = document.querySelector('.selected-card')
            let dropZone = cardElenemt.parentNode
            let isMoveable = activeElement !== cardElenemt && cardElenemt.classList.contains('card')

            if (!isMoveable) {
                return;
            }

            let nextElement = (cardElenemt === activeElement.nextElementSibling)
                ? cardElenemt.nextElementSibling
                : cardElenemt;
            
            dropZone.insertBefore(activeElement, nextElement)
        },
    }
}
</script>

<style lang="sass" scoped>

div.list
    display: flex
    flex-direction: column
    border: 1px solid #000
    width: 200px
    margin: 0 10px
    padding: 5px

div.footer-list
    display: flex
    justify-content: space-between
    padding-top: 10px

div.close
    font-size: 25px
    transform: rotateZ(45deg)
    cursor: pointer

div.add-card
    border: 1px solid #000
    margin-top: 10px
    cursor: pointer

div.card
    display: flex
    flex-direction: column
    padding: 5px
    padding-top: 10px
    transition: 0.5s
    transform: 0.5s
    background-color: #aab6fe
    margin: 10px 0px

.selected-card
    display: block
    background-color: #000051
    opacity: 0
    border: 1px solid #000051

</style>