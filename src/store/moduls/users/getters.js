export default {
    getUserByID: state => userID =>  {
        return state.usersList.find(user => user.system.id === userID);
    },

    getUserListIndex: state => usersID => {
        return state.usersList.findIndex(user => user.system.id === usersID);
    },

    getUserListCopy: state => {
       let userListCopy = []
       for(let user of state.usersList) {
            let tmp= {}
            for(let cat in user) {
                tmp[cat] = {...user[cat]}; // unbounding
            }
            userListCopy.push(tmp);
        }
        return userListCopy;
    },

    getNewFieldsSet: state => userData => {
        let getFieldsDiff = (objectA, ObjectB) => {
            let diffFields = {};
            Object.keys(objectA).map(Categorykey => {
                Object.keys(objectA[Categorykey]).map(key => {
                   if(!(key in ObjectB[Categorykey])) {
                    diffFields[Categorykey] = {[key]: null}
                   }
                });
            });
            return diffFields
        };

        return {
            addedFields: getFieldsDiff(userData, state.bulkUserCard),
            removedFields: getFieldsDiff(state.bulkUserCard, userData)
        };
    },

    getBulkCardCopy: state => {
        let newBulkCard = {}
        for ( let cat in state.bulkUserCard) {
            newBulkCard[cat] = {...state.bulkUserCard[cat]}
        }
        return newBulkCard;
    },
};