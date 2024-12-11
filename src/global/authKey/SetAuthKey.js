function setAuthKey(authKey) {
    const now = new Date();
    const expirationTime = now.getTime() + 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const authData = {
        key: authKey,
        expiresAt: expirationTime
    };
    localStorage.setItem("auth_key", JSON.stringify(authData));
}

export default setAuthKey;