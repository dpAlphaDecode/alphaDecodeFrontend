"use client";

import {useState, useEffect} from "react";
import {
    Box,
    Typography,
    Paper,
    IconButton,
    Button,
    Grow,
    Checkbox,
    FormControlLabel,
} from "@mui/material";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function MultiSelectFilter({
                                              label,
                                              options = [],
                                              selected = [],
                                              onChange,
                                          }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [tempSelected, setTempSelected] = useState([]);

    const open = Boolean(anchorEl);

    useEffect(() => {
        setTempSelected(selected || []);
    }, [selected]);

    // ✅ ACTIVE STATE (ignore "any")
    const isActive =
        Array.isArray(selected) &&
        selected.length > 0 &&
        !selected.includes("any");

    // ✅ Toggle with "any" logic
    const toggle = (val) => {
        let newValue = [...tempSelected];

        if (val === "any") {
            newValue = ["any"]; // reset
        } else {
            newValue = newValue.filter((v) => v !== "any");

            if (newValue.includes(val)) {
                newValue = newValue.filter((v) => v !== val);
            } else {
                newValue.push(val);
            }

            if (newValue.length === 0) {
                newValue = ["any"];
            }
        }

        setTempSelected(newValue);
    };

    // ✅ Reset to "any"
    const handleReset = (e) => {
        e.stopPropagation();
        onChange([]);
    };

    const handleSave = () => {
        onChange(tempSelected);
        setAnchorEl(null);
    };

    const displayValue = () => label;

    return (
        <>
            {/* 🔘 Trigger */}
            <Box
                onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 1.5,
                    py: 0.6,
                    border: "1px solid",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    userSelect: "none",
                    minWidth: "fit-content",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",

                    // ✅ ACTIVE STYLE
                    borderColor: isActive ? "#000" : "#EAEAEA",
                    backgroundColor: isActive ? "#1c1c1c" : "#fff",
                    color: isActive ? "#fff" : "#707070",

                    "&:hover": {
                        backgroundColor: isActive ? "#222" : "#f2f2f2",
                    },
                }}
            >
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "inherit",
                    }}
                >
                    {displayValue()}
                </Typography>

                {/* ❌ Reset only when active */}
                {isActive && (
                    <CloseIcon
                        onClick={handleReset}
                        sx={{
                            fontSize: 14,
                            ml: 0.5,
                            color: "inherit",
                            opacity: 0.8,
                            "&:hover": {
                                color: "#f2f2f2",
                                opacity: 1,
                            },
                        }}
                    />
                )}

                <KeyboardArrowDownIcon
                    sx={{
                        fontSize: 16,
                        color: "inherit",
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "all 0.2s ease",
                    }}
                />
            </Box>

            {/* 📦 Dropdown */}
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start"
                transition
                sx={{zIndex: 9999, Height: 600,}}
            >
                {({TransitionProps}) => (
                    <Grow {...TransitionProps}>
                        <Paper
                            sx={{
                                width: 320,
                                p: 2,
                                mt: 0.5,
                                border: "1px solid #EEEEEE",
                                boxShadow: "0px 4px 10px 0px #00000040",
                                Height: 600,
                            }}
                        >
                            <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                                <Box>
                                    {/* Header */}
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mb={1}
                                        pb={1}
                                        borderBottom="1px solid #eee"
                                    >
                                        <Typography fontWeight={600}>{label}</Typography>

                                        {/* 🧹 Reset inside dropdown */}
                                        <IconButton size="small" onClick={() => setTempSelected(["any"])}>
                                            <DeleteOutlineIcon fontSize="small"/>
                                        </IconButton>
                                    </Box>

                                    {/* Options */}
                                    <Box
                                        maxHeight={350}
                                        overflow="auto"
                                        display="flex"
                                        flexDirection="column"
                                    >
                                        {options.map((opt) => (
                                            <FormControlLabel
                                                key={opt}
                                                sx={{margin: 0}}
                                                control={
                                                    <Checkbox
                                                        size="small"
                                                        checked={tempSelected.includes(opt)}
                                                        onChange={() => toggle(opt)}
                                                    />
                                                }
                                                label={
                                                    <Typography fontSize={12}>{opt}</Typography>
                                                }
                                            />
                                        ))}
                                    </Box>

                                    {/* Footer */}
                                    <Box
                                        display="flex"
                                        justifyContent="flex-end"
                                        mt={2}
                                        pt={1}
                                        borderTop="1px solid #eee"
                                    >
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={handleSave}
                                            sx={{
                                                color: "#ffffff",
                                                backgroundColor: "#3c3b3b",
                                                "&:hover": {
                                                    backgroundColor: "#6a6767",
                                                },
                                                fontWeight: 600
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </Box>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}