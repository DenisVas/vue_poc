<template>
    <form class="user-login-form">
        <h5>{{authResponse.message}}</h5>
        <section class="user-data-fields">
            <h4 class="form-section-title">Enter your email and password</h4>
            <fieldset class="user-edit-field">
                <label for="email">Email:</label>
                <input v-model="formData.email"/>
            </fieldset>
            <fieldset class="user-edit-field">
                <label for="email">Password:</label>
                <input v-model="formData.password"/>
            </fieldset>
        </section>
        <button type="button" class="button button-ok" @click="() => loginUser(formData)"> Submit </button>
    </form>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: "login",
    data() {
        return {
            formData: {
                email: null,
                password: null
            },
        }
    },
    computed: {
        ...mapState('users/',{
             authResponse: state => {
                 return state.authResponse;
             }
        }),
    },
    watch: {
        authResponse: function(response) {
           if (response.success) {
               setTimeout(() => {
                   this.$emit('authorized');
                }, 2000);
           }
        }
    },
    methods: {
        ...mapActions({
            loginUser: 'users/loginUser'
        }),
    }
}
</script>
<style lang="scss" src='./Login.scss' />