<template>
    <div class="user-block">
        <ul  class="user-data-list">
            <li class="grid-header user-data-item">
                <!--TODO: good way refactor users[0].public -->
                <div class="info" v-for="(keyVal, key, index) in users[0].public" :key="'d' + index">
                    {{key}}
                </div>
                <!--admin-type-button-placeholder-->
                <div class="info" v-if="activeUser.system && activeUser.system.admin" />
            </li>
            <li v-for="(user, index) in users" class="user-data-item" :key="'a' + index">
                <div class="info" v-for="(val,key, index) in user.public" :key="'s' + index">
                    {{val}}
                </div>
                <div class="info" v-if="activeUser.system && activeUser.system.admin">
                    <button type="button" class="user-edit-button" @click="editUser(user)"> edit </button>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: "users-list",
    computed: {
        ...mapState('users/',{
             users: state => state.usersList,
             activeUser: state => state.activeUser
        })
    },
    methods: {
        editUser(user) {
            this.$emit('user-edit-request',{ type: "edit", data: user.system.id });
        },
    }
}
</script>
<style lang="scss" src="./userList.scss" />