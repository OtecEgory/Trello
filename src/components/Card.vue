<template>
    <div 
        class="card"
        draggable
        @dragstart.stop="dragStartCard(id)"
        @dragend.stop="dragEndCard(id)"
        @dragover.stop="handleDragOverCard"
    >
        <input
            class="name-card" 
            type="text" 
            autocomplete="off"
            v-model="value"
            @blur="handleBlur"
        >
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
        cardValue: String,
        listId: [String, Number],
        dragStartCard: Function,
        dragEndCard: Function,
        handleDragOverCard: Function,
    },
    data:function(){
        return {
            value: this.cardValue
        }
    },
    methods: {
        handleBlur() {
            this.$store.commit("getValueCard", {
                id: this.id,
                value: this.value, 
                idList: this.listId
            })
        },
    },
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