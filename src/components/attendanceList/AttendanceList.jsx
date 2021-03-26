import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AttendanceCell from "./AttendanceCell";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function AttendanceList({ trainingAttendance }) {
  const classes = useStyles();
  const { players, playerIDs, trainings, trainingIDs } = useSelector(
    (state) => state.trainingAttendance
  );

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            {trainingIDs.map((trainingID) => (
              <TableCell key={trainingID} align="right">
                {new Date(trainings[trainingID].date).toLocaleDateString("cs")}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {playerIDs.map((playerId) => (
            <TableRow key={playerId}>
              <TableCell component="th" scope="row">
                {`${players[playerId].surname} ${players[playerId].firstname}`}
              </TableCell>
              {trainingIDs.map((trainingID) => (
                <TableCell key={trainingID} align="right">
                  <AttendanceCell
                    isSuccess={players[playerId].trainings.includes(trainingID)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
