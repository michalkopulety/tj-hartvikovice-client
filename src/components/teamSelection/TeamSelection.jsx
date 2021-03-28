import React from "react";
import { InputLabel, MenuItem, Select } from "@material-ui/core";

export default function TeamSelection({ value, onChange }) {
  return (
    <>
      <InputLabel id="teamSelectionLabel">Tým</InputLabel>
      <Select labelId="teamSelectionLabel" value={value} onChange={onChange}>
        <MenuItem value="A">A tým</MenuItem>
        <MenuItem value="U8">Mladší přípravka</MenuItem>
      </Select>
    </>
  );
}
