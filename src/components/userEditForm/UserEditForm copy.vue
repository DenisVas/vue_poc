<template>
    <form class="user-edit-form" v-if="localuser">
        <!--TODO: can be 1 cycle-->
        <h4 class="form-section-title">Systep fields</h4>
        <section class="user-data-fields">
            <fieldset class="user-edit-field" v-for="(value,fieldname, index) in localuser.system" :key="index">
                <label :for="'system-' + fieldname">{{fieldname}}:</label>
                <Input :name="'system-' + fieldname" type="text" :value="value" disabled/>
            </fieldset>
        </section>

        <h4 class="form-section-title">Public fields</h4>
        <section class="user-data-fields">
            <!-- on change show case -->
            <fieldset class="user-edit-field" v-for="(data,fieldname, index) in localuser.public" :key="index">
                <label :for="'private-' + fieldname">{{fieldname}}:</label>
                <Input :name="'private-' + fieldname" 
                type="text" 
                :value="localuser.public[fieldname]" 
                @input="onChange('private',fieldname, $event.target.value)"/>
            </fieldset>
            <!-- v-model show case -->
            <fieldset class="user-edit-field" v-for="(field, index) in newFileds.public" :key="'new-public' + index">
                <input @input="field.fieldname" v-model="field.fieldname" required>
                <input v-model="field.value">
            </fieldset>
            <fieldset class="user-edit-field">
                <label for="'public-add-new-field">add new field:</label>
                <Input name="'public-' + fieldname" type="button" value="add new field" @click="addNewField('public')"/>
            </fieldset>
        </section>

        <h4 class="form-section-title">Private fields</h4>
        <section class="user-data-fields">
            <fieldset class="user-edit-field" v-for="(value,fieldname, index) in localuser.private" :key="index">
                <label :for="'private-' + fieldname">{{fieldname}}:</label>
                <Input :name="'private-' + fieldname" 
                type="text" 
                :value="value" 
                @input="onChange('private',fieldname, $event.target.value)"/>
            </fieldset>

            <fieldset class="user-edit-field" v-for="(field, index) in newFileds.private" :key="'new-private' + index">
                <input v-model="field.fieldname">
                <input v-model="field.value">
            </fieldset>
            <fieldset class="user-edit-field">
                <label for="'public-add-new-field">add new field:</label>
                <Input name="'public-' + fieldname" type="button" value="add new field" @click="addNewField('private')"/>
            </fieldset>
        </section>
        <button type="button" @click="saveChanges">save changes </button>
        <button type="button" @click="cancelChanges">cancel changes </button>
    </form>
</template>

<script>
import { mapGetters } from 'vuex'

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
        this.localuser = this.makeLocaluserCopy(this.editUserData);
    },

    methods: {

        parseSystemData(data) {
            let arr = []
            for (let val in data) {
                arr.push({
                    filedName: val,
                    filedValue: data[val]
                })
            }
            console.log(arr);
            return arr;
        },
        makeLocaluserCopy(userData) {
            this.parseSystemData(userData.system);
            return {
                system: {...userData.system},
                public: {...userData.public},
                private: {...userData.private},
            }
        },

        addNewField(fieldGroup) {
            this.newFileds[fieldGroup].push({ 
                fieldname: '', 
                value: '' 
            });
        },

        onChange(fieldGroup, fieldname, vaule) {
            this.localuser[fieldGroup][fieldname] = vaule;
        },

        normalizeUserdata() {
            if (this.newFileds.public.length > 0) {
               this.newFileds.public.forEach(field => {
                this.localuser.public[field.fieldname] = field.value
               });                
            }
            if (this.newFileds.private.length > 0) {
               this.newFileds.private.forEach(field => {
                this.localuser.private[field.fieldname] = field.value
               });                
            }
        },

        saveChanges() {
            this.normalizeUserdata();
            console.log(this.localuser);
        },

        cancelChanges() {
            console.log(this.editUserData);
            this.localuser = this.makeLocaluserCopy(this.editUserData);
            console.log(this.localuser)
        }
    }
}
</script>
<style lang="scss" src="./userEditForm.scss" />