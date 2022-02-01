const SetUser = (userID, premissions,PersonalInfo) => {
    return {
        type: 'SetCurrentUser',
        payload: userID,
        payloadPremissions: premissions,
        payloadPersonalInfo: PersonalInfo
    }
}

const LogOut = () => {
    return {
        type: 'LogOut',
    }
}

export { SetUser, LogOut }