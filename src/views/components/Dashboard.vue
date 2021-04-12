<template>
    <div class="list-block">
        <div class="panel">
            <div 
                class="plus"
                @click="$store.commit('addNewList')">
                +
            </div>
        </div>
        <div 
            class="drop-zone"
            @dragover.prevent
        >
            <List
                v-for="item in $store.state.allLists"
                :key="item.id"
                :id="item.id"
                :dragStart="startDrop"
                :dragend="endDrop"
                :dragOver="handleDragOver"
                :cards="item.cards"
            /> 
        </div>
    </div>
</template>

<script>
import List from '../../components/List'
// import { v4 as uuidv4 } from 'uuid'


export default {
    components: { List },
    // mounted() {
    //     this.$store.dispatch("getLists")
    // },
    methods:{
        // addNewList(){
        //     this.allList.push({
        //         id: uuidv4(),
        //         cards: [],
        //     })
        // },
        startDrop(e){
            e.currentTarget.classList.add('selected');
        },
        endDrop(e){
            e.currentTarget.classList.remove('selected');
        },
        handleDragOver(e){
            const listElenemt = e.currentTarget
            
            const dropZone = document.querySelector('.drop-zone')
            const activeElement = document.querySelector('.list.selected');
            // const dropZoneList = e.dataTransfer.getData()
            const isMoveable = activeElement !== listElenemt && listElenemt.classList.contains('list');

            if (!isMoveable) {
                return;
            }
            
            const nextElement = (listElenemt === activeElement.nextElementSibling)
                ? listElenemt.nextElementSibling
                : listElenemt

            dropZone.insertBefore(activeElement, nextElement);
            // dropZoneList.appendChild(activeElement, nextElement)
        },
    }
}
</script>

<style lang="sass" scoped>

div.panel
    height: 100%
    min-width: 100px
    position: fixed
    top: 0
    background-color: #FFFFFF
    left: 0
    padding: 10px
    box-shadow: 0 0 10px rgba(0,0,0,0.3)

div.drop-zone
    display: flex

div.plus
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    font-size: 60px
    padding: 10px
    border-radius: 30px
    border: 1px solid #000

div.list-block
    display: flex
    width: auto
    align-items: flex-start
    margin-left: 120px

div.list
    cursor: pointer
    background-color: #26418f

.selected
    opacity: 0.8
    background-color: #8e99f3

</style>