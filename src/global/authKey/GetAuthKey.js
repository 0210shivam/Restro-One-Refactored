function getAuthKey() {
    const authDataString = localStorage.getItem("auth_key");
    if (!authDataString) {
        return null;
    }

    const authData = JSON.parse(authDataString);
    const now = new Date();

    // Check if the auth_key is expired
    if (now.getTime() > authData.expiresAt) {
        localStorage.removeItem("auth_key"); // Clean up expired key
        return null; // Return null as the key has expired
    }

    return authData.key; // Return the valid auth_key
}

export default getAuthKey;