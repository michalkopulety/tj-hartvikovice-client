import React from "react";
import {CheckCircle, Block} from '@material-ui/icons';
import { green } from "@material-ui/core/colors";

export default function AttendanceCell({isSuccess}) {
    return ( isSuccess ?
        <CheckCircle style={{ color: green[500] }} /> : 
        <Block color="secondary" />);
};