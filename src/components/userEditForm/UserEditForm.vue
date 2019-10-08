<template>
    <form class="user-edit-form" v-if="localuser">
        <section class="user-data-fields" 
        v-for="(val,categoryKey, index) in localuser" 
        :key="'section-' + index">
            <h4 class="form-section-title">{{categoryKey}} fields</h4>
            <fieldset class="user-edit-field" 
            v-for="(data, index) in localuser[categoryKey]" 
            :key="categoryKey + '-' + index">
                <label :for="'system-' + data.fieldName">{{data.fieldName}}:</label>
                <input v-model="data.value" :disabled="categoryKey === 'system'"/>
            </fieldset>
            <fieldset class="user-edit-field" 
            v-for="(data, index) in newFileds[categoryKey]" 
            :key="'new-' + categoryKey + '-' + index">
                <input @input="liveValidate" v-model.lazy="data.fieldName" required/>
                <input v-model="data.value"/>
            </fieldset>
             <fieldset class="user-edit-field" v-if="categoryKey !== 'system'">
                <label for="'public-add-new-field">add new field:</label>
                <input name="'public-add-new-field'" type="button" value="add new field" @click="addNewField(categoryKey)"/>
            </fieldset>
        </section>
        <button type="button" class="button button-ok" @click="saveChanges">save changes </button>
        <button type="button" class="button button-cancel" @click="cancelChanges">cancel changes </button>
    </form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import helpers from './../../helpers/helpers';

export default {
    name: "user-edit-form",
    props: {
        userId: { type: String, required: true, default: null }
    },

    data() {
        return {
            localuser: null,
            newFileds: {
                public: [],
                private: []
            }
        }
    },

    computed: {
        ...mapGetters({
            getUserByID: 'users/getUserByID'
        }),
        editUserData() {
            return this.getUserByID(this.userId);
        },
    },

    created() {
        this.localuser = this.makeFormData(this.editUserData);
    },

    // directive approach is laggy it will occasionally allow input value to contain 
    // undesirable values
    // directives: {
    //     liveValidate: {
    //        update: (el, binding) => {
    //            el.value = 111
    //            console.log(el.value)
    //        }
    //     }
    // },

    methods: {
         ...mapActions({
            updateUser: 'users/updateUser'
        }),

        liveValidate(e) {
            const onlyChars = new RegExp(/^[a-zA-Z]+$/, 'g');
            if (!onlyChars.test(e.target.value)) {
                e.target.value = e.target.value.slice(0, -1);
            }
        },

        makeFormData(userData) {
            let parsedUserData = {};
            for(let dataKey in userData) {
                parsedUserData[dataKey] = helpers.parseUserDBFiledsToFormFormat(userData[dataKey]);
            }
            return parsedUserData;
        },

        addNewField(fieldGroup) {
            this.newFileds[fieldGroup].push({ 
                fieldName: '', 
                value: '' 
            });
        },

        clearNewFields() {
            this.newFileds = {
                public: [],
                private: []
            }
        },

        normalizeUserdata(localuser) {
            localuser.public = localuser.public.concat(this.newFileds.public);
            localuser.private = localuser.private.concat(this.newFileds.private);
            
            return helpers.parseUserFormFiledsToDBFormat(localuser);
        },

        saveChanges() {
            this.updateUser(this.normalizeUserdata(this.localuser));
            this.clearNewFields();
        },

        cancelChanges() {
            this.localuser = this.makeFormData(this.editUserData);
            this.clearNewFields();
        }
    }
}
</script>
<style lang="scss" src="./userEditForm.scss" />