export function hasRole(roles, role) {
    let rolesFound = roles.filter(filter_role => {
        return role === filter_role;
    });
    return rolesFound.length > 0;
}
