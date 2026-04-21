"use client";

import {useState} from "react";
import {
    Box,
    Typography,
    Popover,
    Checkbox,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CloseIcon from "@mui/icons-material/Close";

export default function DropdownFilter({
                                           label,
                                           value,
                                           onChange,
                                           options,
                                           multi = false,
                                       }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // ✅ ACTIVE STATE (FIXED)
    const isActive = (() => {
        if (multi) {
            return (
                Array.isArray(value) &&
                value.length > 0 &&
                !value.includes("any") // ❌ ignore "any"
            );
        }

        // single select
        if (value === null || value === undefined) return false;
        if (typeof value === "string" && value.trim() === "") return false;
        if (value === "any") return false; // ✅ key condition

        return true;
    })();

    // ✅ Reset handler
    const handleReset = (e) => {
        e.stopPropagation();
        onChange(multi ? ["any"] : "any");
    };

    // ✅ Multi select handler
    const handleMultiChange = (val) => {
        let newValue = Array.isArray(value) ? [...value] : [];

        if (newValue.includes(val)) {
            newValue = newValue.filter((v) => v !== val);
        } else {
            newValue.push(val);
        }

        onChange(newValue);
    };

    // ✅ Label display
    const displayValue = () => label;

    return (
        <>
            {/* 🔘 Trigger */}
            <Box
                onClick={(e) => setAnchorEl(e.currentTarget)}
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

                    // ✅ ACTIVE STYLE (dark theme)
                    borderColor: isActive ? "#000" : "#EAEAEA",
                    backgroundColor: isActive ? "#1c1c1c" : "#fff",
                    color: isActive ? "#fff" : "#707070",

                    "&:hover": {
                        backgroundColor: isActive ? "#222" : "#f2f2f2",
                    },
                }}
            >
                {/* Label */}
                <Typography
                    sx={{
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "inherit",
                    }}
                >
                    {displayValue()}
                </Typography>

                {/* ❌ Reset button */}

                {/* ✅ Active → Show Reset Box */}
                {isActive ? (
                    <Box
                        onClick={handleReset}
                        sx={{
                            ml: 0.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 18,
                            height: 18,
                            borderRadius: "4px",
                            cursor: "pointer",
                            transition: "all 0.2s ease",

                            "&:hover": {
                                backgroundColor: "#555353",
                            },
                        }}
                    >
                        <CloseIcon
                            sx={{
                                fontSize: 14,
                                color: "#fff",
                            }}
                        />
                    </Box>
                ) : (
                    /* ⬇ Arrow only when NOT active */
                    <KeyboardArrowDownIcon
                        sx={{
                            fontSize: 16,
                            color: "inherit",
                            transform: open ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "all 0.2s ease",
                        }}
                    />
                )}
            </Box>

            {/* 📦 Dropdown */}
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                PaperProps={{
                    sx: {
                        mt: 1,
                        p: 1,
                        maxHeight: 400,
                        overflowY: "auto",
                        border: "1px solid #EEEEEE",
                        boxShadow: "0px 4px 10px 0px #00000040",
                        width: 320,
                    },
                }}
            >
                {/* 🏷 Title */}
                <Typography
                    sx={{
                        px: 1.5,
                        py: 1,
                        fontSize: "14px",
                        fontWeight: 600,
                    }}
                >
                    {label}
                </Typography>

                {/* 📋 Options */}
                {options.map((opt) => {
                    const isSelected = multi
                        ? value?.includes(opt.value)
                        : value === opt.value;

                    return (
                        <Box
                            key={opt.value}
                            onClick={(e) => {
                                e.stopPropagation();

                                if (multi) {
                                    handleMultiChange(opt.value);
                                } else {
                                    onChange(opt.value);
                                    setAnchorEl(null);
                                }
                            }}
                            sx={{
                                px: 1.5,
                                py: 1,
                                cursor: "pointer",
                                backgroundColor: isSelected ? "#eee" : "transparent",
                                "&:hover": {
                                    backgroundColor: "#f5f5f5",
                                },
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            {/* Checkbox */}
                            {multi && (
                                <Checkbox
                                    size="small"
                                    checked={isSelected}
                                    onClick={(e) => e.stopPropagation()}
                                    sx={{p: 0.5}}
                                />
                            )}

                            <Box>
                                <Typography
                                    sx={{
                                        fontSize: "14px",
                                        fontWeight: 500,
                                    }}
                                >
                                    {opt.label}
                                </Typography>

                                {opt.desc && (
                                    <Typography
                                        sx={{
                                            fontSize: "12px",
                                            color: "#777",
                                        }}
                                    >
                                        {opt.desc}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    );
                })}
            </Popover>
        </>
    );
}