const initialState = {
    CurrentUserID: 0,
    CurrentUserPremissions: []
}

const applyStoreChanges = (state = initialState, action) => {
    switch (action.type) {
        case "SetCurrentUser":
            return { CurrentUserID: action.payload, CurrentUserPremissions : action.payloadPremissions}

        case "delete": {
            return { CurrentUserID: 0, CurrentUserPremissions:[]}
        }

        default:
            return state
    }
}

export default applyStoreChanges