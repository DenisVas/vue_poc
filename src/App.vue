<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <users-list @user-edit-request="showPopupRequest" />
    <pop-up :show-popup="popupData.show" @popup-closed="hidePopup">
      <login v-if="popupData.playLoad.type === 'login'" />
      <register-new-user v-if="popupData.playLoad.type === 'registration'" />
      <user-edit-form :user-id="popupData.playLoad.data" v-if="popupData.playLoad.type === 'edit'" />
    </pop-up>
    <button @click="showPopupRequest({type: 'registration', data: null })" class="button button-ok"> registration </button>
    <button @click="showPopupRequest({type: 'login', data: null })" class="button button-ok"> login </button>
  </div>
</template>

<script>
import UserEditForm from './components/userEditForm/UserEditForm'
import UsersList from './components/usersList/UsersList'
import PopUp from './components/popUp/PopUp'
import RegisterNewUser from './components/registerNewUser/RegisterNewUser'
import Login from './components/login/Login'
import store from './store'

export default {
  name: 'app',
  store,
  components: {
    UserEditForm,
    UsersList,
    PopUp,
    Login,
    RegisterNewUser
  },
  data() {
    return {
      popupData: {
        show: false,
        playLoad: {
          type: '',
          data: {}
        }
      }
    }
  },

  methods: {
    showPopupRequest(data) {
      this.popupData.show = true;
      this.popupData.playLoad = {...data};
      console.log(this.popupData.playLoad);
    },
    hidePopup() {
      this.popupData.show = false;
      this.popupData.playLoad = {
          type: '',
          data: {}
        };
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
