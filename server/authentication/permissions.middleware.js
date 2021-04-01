const jwtAuthz = require("express-jwt-authz");

module.exports = (permissions) => {
    let requestedPermissions = Array.isArray(permissions) ? permissions : [permissions];
    return jwtAuthz(requestedPermissions, {
        customScopeKey: "permissions",
        checkAllScopes: true,
        failWithError: true
    });
};