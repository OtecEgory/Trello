<template>
    <div
        class="list"
        draggable
        @dragstart="dragStart"
        @dragend="dragend"
        @dragover="dragOver"
    >
        <input type="name-list" autocomplete="off">
        <div class="footer-list">
            <button>Add List</button>
                <div class="close">+</div>
            </div>
            <div 
                class="add-card"
                @click="addNewCard"
            >
                add a card
            </div>
            <div class="wrap-card">
                <Card
                    :dragStartCard="startDropCard"
                    :dragEndCard="endDropCard"
                    :handleDragOverCard="handleDragOverCard"
                    v-for="item in allCards"
                    :key="item.id" 
                />
            </div>
        </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid' 
import Card from './Card'
export default {
    props: {
        dragStart: Function,
        dragend: Function,
        dragOver: Function,
    },
    components: { Card },
    data:function(){
        return{
            allCards:[],
        }
    },
    methods:{
        addNewCard(){
            this.allCards.push({
                id: uuidv4()
            })
        },
        startDropCard(e){
            e.currentTarget.classList.add('selected-card');
        },
        endDropCard(e){
            e.currentTarget.classList.remove('selected-card');
        },
        handleDragOverCard(e){
            const cardElenemt = e.currentTarget
            const dropZone = document.querySelector('.wrap-card')
            const activeElement = document.querySelector('.card.selected-card');
            const isMoveable = activeElement !== cardElenemt && cardElenemt.classList.contains('card');

            if (!isMoveable) {
                return;
            }
            
            const nextElement = (cardElenemt === activeElement.nextElementSibling)
                ? cardElenemt.nextElementSibling
                : cardElenemt

            dropZone.insertBefore(activeElement, nextElement);
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
    width: 200px
    padding-top: 10px
    transition: 0.5s
    transform: 0.5s

.selected-card
    background-color: #000

</style>