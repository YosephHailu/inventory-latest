export function login(credentials) {
    return new Promise((resolve, reject) => {
        axios
            .post("api/auth/login", credentials)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject("wrong Username or password");
            });
    });
}

export function getLocalUser() {
    const userStr = localStorage.getItem("local_auth");

    if (!userStr) {
        return {
            logged_in: false,
            user: null
        };
    }

    return JSON.parse(userStr);
}

export function getLocalConfig() {
    const local_config = localStorage.getItem("local_config");

    if (!local_config) {
        return {};
    }

    return JSON.parse(local_config);
}

export function getLocalRoles() {
    const rolesStr = localStorage.getItem("roles");

    if (!rolesStr) {
        return null;
    }

    return JSON.parse(rolesStr);
}
