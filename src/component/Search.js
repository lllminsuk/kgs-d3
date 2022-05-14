import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export default function Search({ setWords }) {
  return (
    <Paper
      component="form"
      sx={{
        m: 2,
        px: 3,
        py: 0.5,
        display: "flex",
        alignItems: "center",
        width: 400,
        borderRadius: 1000,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="검색 단어 입력 (띄어쓰기 단위)"
        onChange={(e) => setWords(e.target.value)}
      />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
