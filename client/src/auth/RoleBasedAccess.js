import rules from './rbac-rules';
import { getConfig } from "../config";

const workspace = getConfig().audience + "/roles";

const check = (rules, user, actions) => {
	let isAllowed = false;
    if (user) {
        const roles = user[ workspace ];
        const permissions = roles.reduce((acc, role) => {
            return rules[role] ? acc.concat(rules[role]) : acc;
        }, []); 
    
    
        if (permissions) {
            isAllowed = !actions.split(',').some((action)=> {
                return !permissions.includes(action)
            });
        }  
    }

	return isAllowed;
};

const Can = props => (check(rules, props.user, props.perform, props.data) ? props.yes() : props.no());

Can.defaultProps = {
	yes: () => null,
	no: () => null
};

export default Can;