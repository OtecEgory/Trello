<template>
    <div 
        class="card"
        draggable
        @dragstart.stop="dragStartCard(id)"
        @dragenter.stop="handleDragEnter"
        @dragend.stop="dragEndCard(id)"
        @dragover.stop="handleDragOverCard"
    >
        <input type="name-card" autocomplete="off">
        <div class="footer-card">
        <button>Add Card</button>
            <div class="close">+</div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        id: [String, Number],
        listId: [String, Number],
        dragStartCard: Function,
        dragEndCard: Function,
        handleDragOverCard: Function,
    },
    methods: {
        handleDragEnter(e) {
            console.log("Card Drag Enter!")
            console.log(e.currentTarget)
        }
    }
}
</script>

<style lang="sass" scoped>

    div.footer-card
        display: flex
        justify-content: space-between
        padding-top: 10px

    div.close
        font-size: 25px
        transform: rotateZ(45deg)
        cursor: pointer

</style>