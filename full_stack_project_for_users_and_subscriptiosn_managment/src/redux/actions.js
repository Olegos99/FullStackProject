const SetUser = (userID, premissions) => {
    return {
        type: 'SetCurrentUser',
        payload: userID,
        payloadPremissions: premissions
    }
}

const deleteUser = () => {
    return {
        type: 'delete',
    }
}

export { SetUser, deleteUser }