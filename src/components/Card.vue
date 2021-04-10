<template>
    <div 
        class="card"
        draggable
        @dragstart="dragStartCard"
        @dragend="dragEndCard"
        @dragover="handleDragOverCard"
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
        dragStartCard: Function,
        dragEndCard: Function,
        handleDragOverCard: Function
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