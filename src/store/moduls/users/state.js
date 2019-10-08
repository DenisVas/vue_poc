const defaultUserFields = {
    system: {
        id: null,
        admin: null,
    },
    public: {
        name: null,
        email: null,
    },
    private: {
        password: null
    },
  };

export default {
    userIDCounter: 2,
    bulkUserCard: defaultUserFields,
    activeUser: {},
    authResponse: {
        success: null,
        message: ''
    },
    usersList: [
        { 
            system: {
              id: "U1",
              admin: true
            },
            public: {
              name: "Admin",
              email: "admin@admin.com",
            },
            private: {
              password: "admin"
            }
        },
        {
            system: {
              id: "U2",
              admin: false
            },
            public: {
              name: "Denv",
              email: "denv@denv.com", 
            },
            private: {
              password: "123321asd"
            }
        }
    ]
  }