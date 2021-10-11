/**
 * 
 * @param {Number} role 
 * @returns {String} STUDENT | INSTRUCTOR | ADMIN
 */
export function checkRole(role) {
    switch (role) {
        case 0:
            return "STUDENT";
        case 1:
            return "INSTRUCTOR";
        case 10:
            return "ADMIN";
        default:
            return role;
    }
}
