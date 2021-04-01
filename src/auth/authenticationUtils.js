import {
    getConfig
} from "../config";
import {
    PREDEFINED_ROLES
} from "./rbac-rules";

export function hasUserRequiredPermissions(user, requiredActions) {
    const workspace = getConfig().audience + "/roles";
    let isAllowed = false;
    if (user) {
        const roles = user[workspace];
        const permissions = roles.reduce((acc, role) => {
            return PREDEFINED_ROLES[role] ? acc.concat(PREDEFINED_ROLES[role]) : acc;
        }, []);


        if (permissions) {
            isAllowed = !requiredActions.split(',').some((action) => {
                return !permissions.includes(action)
            });
        }
    }

    return isAllowed;
}