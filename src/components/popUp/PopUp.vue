<template>
    <div class="popup-block" v-if="showPopup">
        <div class="popup-body">
            <slot/>
        </div>
        <div class="popup-curtain" v-if="showPopup" @click="closePopup" />
    </div>
</template>
<script>
export default {
    name: "popup",
    props: {
        showPopup: { type: Boolean, required: true, default: true }
    },
    methods: {
        closePopup() {
            this.$emit("popup-closed");
        }
    }
}
</script>
<style lang="scss" src="./popUp.scss"/>