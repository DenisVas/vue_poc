export default {
    updateUser: ({ dispatch, commit, state, getters }, userData) => {
        const usersIndex = getters.getUserListIndex(userData.system.id); // get current user position
        state.usersList[usersIndex] = userData; // replace updated users in user list
        let newFiledSet = getters.getNewFieldsSet(userData); // check for new user card fields
        commit('UPDATE_USERLIST', state.usersList); 
        // patch all users with new fieldSet (if any changes occurred)
        if (Object.keys(newFiledSet.addedFields).length || Object.keys(newFiledSet.removedFields).length) {
            dispatch('normalizeUserList', newFiledSet)
        }
    },

    normalizeUserList: ({ commit, getters }, newFieldsSet) => {
        let userList = getters.getUserListCopy; // prevent mutations
        let bulkCard = getters.getBulkCardCopy; // prevent mutations

        // remove fields
        for(let dataCategory in newFieldsSet.removedFields) {
            for(let dataKey in newFieldsSet.removedFields) {
                delete bulkCard[dataCategory][dataKey];
                userList = userList.map(user => {
                    delete user[dataCategory][dataKey];
                    return user;
                });
            }
        }
        // add new fields
        for(let dataCategory in newFieldsSet.addedFields) {
            bulkCard[dataCategory] = Object.assign({}, newFieldsSet.addedFields[dataCategory], bulkCard[dataCategory]);
            userList = userList.map(user => {
                user[dataCategory] = Object.assign({}, newFieldsSet.addedFields[dataCategory], user[dataCategory]);
                return user;
            });
        }
        commit('UPDATE_USERLIST', userList); // updated user list
        commit('UPDATE_BULKUSERCARD', bulkCard); // update bulkUserCard
    },

    addNewUser: ({ commit, state, getters }, userData) => {
        commit('UPDATED_USERIDCOUNTER');
        userData.system = state.bulkUserCard.system
        userData.system.id = 'U' + state.userIDCounter;
        userData.system.admin = false;
        let userList = getters.getUserListCopy;
        userList.push(userData);
        commit('UPDATE_USERLIST', userList);
    },

    loginUser: ({ commit, state }, userData) => {
        let activeUser = state.usersList.find(user => user.public.email === userData.email);
        if (activeUser && activeUser.private.password === userData.password) {
            commit('SET_ACTIVEUSER', activeUser);
            commit('SET_AUTHRESPONS', {success: true, message: 'success'});
        } else {
            commit('SET_AUTHRESPONS', {success: false, message: 'email or password is incorect'});
        }
    } 
}