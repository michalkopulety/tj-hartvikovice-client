import { useAuth0 } from "@auth0/auth0-react";
import { hasUserRequiredPermissions } from "./authenticationUtils";

const RoleBasedAccessComponent = ({
  component,
  missingRoleComponent,
  requiredActions,
}) => {
  const { user } = useAuth0();

  return hasUserRequiredPermissions(user, requiredActions)
    ? component
    : missingRoleComponent;
};

RoleBasedAccessComponent.defaultProps = {
  component: null,
  missingRoleComponent: null,
};

export default RoleBasedAccessComponent;
