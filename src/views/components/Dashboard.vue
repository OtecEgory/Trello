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

export default {
    components: { List },
    methods:{
        startDrop(e){
            e.currentTarget.classList.add('selected');
        },
        endDrop(e){
            e.currentTarget.classList.remove('selected');
        },
        handleDragOver(e){
            let listElenemt = e.currentTarget
            let dropZone = document.querySelector('.drop-zone')
            let activeElement = document.querySelector('.list.selected');
            let isMoveable = activeElement !== listElenemt && listElenemt.classList.contains('list');

            if (!isMoveable) {
                return;
            }

            if(!activeElement){
                return false;
            }
            
            let nextElement = (listElenemt === activeElement.nextElementSibling)
                ? listElenemt.nextElementSibling
                : listElenemt

            dropZone.insertBefore(activeElement, nextElement);
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