export default {
    UPDATE_USERLIST: (state, updatedUsersList) => {
        // spread is important for components to see updates
        state.usersList = new Array(...updatedUsersList);
    },
    UPDATE_BULKUSERCARD: (state, newCard) => {
        state.bulkUserCard = newCard;
    },
    UPDATED_USERIDCOUNTER: state => {
        state.userIDCounter++;
    },
    SET_ACTIVEUSER: (state, userData) => {
        state.activeUser = userData;
    },
    SET_AUTHRESPONS: (state, message) => {
        state.authResponse = message;
    }
}