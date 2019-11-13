<template>
    <form class="register-new-user">
        <section class="user-data-fields">
            <h4 class="form-section-title">Your public fields</h4>
            <fieldset class="user-edit-field" 
            v-for="(data, index) in formFields.public" 
            :key="'public-' + index">
                <label :for="'system-' + data.fieldName">{{data.fieldName}}:</label>
                <input v-model="data.value"/>
            </fieldset>
        </section>
        <section class="user-data-fields">
            <h4 class="form-section-title">Your private fields</h4>
            <fieldset class="user-edit-field" 
            v-for="(data, index) in formFields.private" 
            :key="'private-' + index">
                <label :for="'system-' + data.fieldName">{{data.fieldName}}:</label>
                <input v-model="data.value"/>
            </fieldset>
        </section>
        <button type="button" class="button button-ok registration-submit" @click="submitNewUser"> Submit </button>
    </form>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import helpers from './../../helpers/helpers';

export default {
    name: 'register-new-user',
    data() {
        return {
            formFields: null
        }
    },

    computed: {
        ...mapGetters({
            getBulkCardCopy: 'users/getBulkCardCopy'
        })
    },

    created() {
        this.formFields = this.makeFormFileds(this.getBulkCardCopy);
    },

    methods: {
        ...mapActions({
            addNewUser: 'users/addNewUser'
        }),

        makeFormFileds(data) {
            let parsedData = {};
            for(let dataKey in data) {
                if (dataKey !== 'system') {
                    parsedData[dataKey] = helpers.parseUserDBFiledsToFormFormat(data[dataKey]);
                }
            }
            return parsedData;
        },

        submitNewUser() {
            this.addNewUser(helpers.parseUserFormFiledsToDBFormat(this.formFields));
        }

    }
}
</script>
<style lang="scss" src="./registerNewUser.scss" scoped />