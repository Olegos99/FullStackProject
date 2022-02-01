const initialState = {
    CurrentUserID: 0,
    CurrentUserPremissions: [],
    personalData:[]
}

const applyStoreChanges = (state = initialState, action) => {
    switch (action.type) {
        case "SetCurrentUser":
            return {
                CurrentUserID: action.payload,
                CurrentUserPremissions : action.payloadPremissions,
                personalData : action.payloadPersonalInfo
            }

        case "LogOut": {
            return { CurrentUserID: 0, CurrentUserPremissions:[],personalData:[] }
        }

        default:
            return state
    }
}

export default applyStoreChanges