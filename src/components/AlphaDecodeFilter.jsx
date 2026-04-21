"use client";

import {useState, useEffect} from "react";
import {
    Box,
    Typography,
    Slider,
    Button,
    Paper,
    IconButton,
    Grow,
} from "@mui/material";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";


const DEFAULT_FILTER = {
    price: [0, 100],
    sector: [0, 100],
    earning: [0, 100],
    institutional: [],
    smr: [],
};

export default function AlphaDecodeFilter({
                                              alphadecodeFilter = DEFAULT_FILTER,
                                              setAlphadecodeFilter,
                                          }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [tempFilter, setTempFilter] = useState(DEFAULT_FILTER);

    const open = Boolean(anchorEl);

    // ✅ sync temp when parent changes
    useEffect(() => {
        setTempFilter(alphadecodeFilter || DEFAULT_FILTER);
    }, [alphadecodeFilter]);

    // ✅ active state based on applied filter
    const isActive =
        JSON.stringify(alphadecodeFilter) !== JSON.stringify(DEFAULT_FILTER);

    const handleToggle = (e) => {
        setAnchorEl((prev) => (prev ? null : e.currentTarget));
    };

    const handleClose = () => setAnchorEl(null);

    const handleReset = () => {
        setTempFilter(DEFAULT_FILTER); // only reset temp
    };

    const handleSave = () => {
        setAlphadecodeFilter(tempFilter); // apply
        setAnchorEl(null); // close dropdown
    };

    const marks = Array.from({length: 11}, (_, i) => ({
        value: i * 10,
        label: i % 2 === 0 ? `${i * 10}` : "",
    }));

    const Range = ({label, valueKey}) => (
        <Box mb={1}>
            <Typography fontSize="14px" fontWeight={500}>
                {label}
            </Typography>
            <Slider
                value={tempFilter[valueKey]}
                onChange={(e, val) =>
                    setTempFilter((prev) => ({
                        ...prev,
                        [valueKey]: val,
                    }))
                }
                min={0}
                max={100}
                step={10}
                marks={marks}
                size="small"
                valueLabelDisplay="auto"
                sx={{
                    color: "#d0d0d0", // main track color

                    "& .MuiSlider-thumb": {
                        backgroundColor: "#2c2c2c",
                        border: "2px solid #090909",
                        "&:hover": {
                            boxShadow: "0 0 0 6px rgba(0,0,0,0.08)",
                        },
                    },

                    "& .MuiSlider-track": {
                        backgroundColor: "#171717",
                        border: "none",
                    },

                    "& .MuiSlider-rail": {
                        backgroundColor: "#cac8c8",
                        opacity: 1,
                    },

                    "& .MuiSlider-mark": {
                        backgroundColor: "#000000",

                    },

                    "& .MuiSlider-markLabel": {
                        fontSize: "12px",
                        color: "#000000",
                    },

                    "& .MuiSlider-valueLabel": {
                        backgroundColor: "#343434",
                        fontSize: "12px",
                    },
                }}
            />
        </Box>
    );

    const RatingGroup = ({label, valueKey}) => {
        const options = ["A", "B", "C", "D", "E"];

        const toggle = (val) => {
            setTempFilter((prev) => {
                const exists = prev[valueKey].includes(val);
                return {
                    ...prev,
                    [valueKey]: exists
                        ? prev[valueKey].filter((v) => v !== val)
                        : [...prev[valueKey], val],
                };
            });
        };

        return (
            <Box mb={1}>
                <Typography fontSize="0.8rem" fontWeight={500} mb={1}>
                    {label}
                </Typography>

                <Box display="flex" gap={1}>
                    {options.map((opt) => {
                        const selected = tempFilter[valueKey].includes(opt);

                        return (
                            <Button
                                key={opt}
                                size="small"
                                variant={selected ? "contained" : "outlined"}
                                onClick={() => toggle(opt)}

                                sx={{
                                    minWidth: 36,
                                    height: 28,
                                    fontSize: "12px",
                                    textTransform: "none",
                                    borderColor: "#ddd",
                                    color: "#000000",
                                    ...(selected && {
                                        backgroundColor: "#000000",
                                        color: "#ffffff",
                                        borderColor: "#d0d0d0",
                                        "&:hover": {
                                            backgroundColor: "#4a4a4a",
                                        },
                                        fontWeight:600
                                    }),
                                }}
                            >
                                {opt}
                            </Button>
                        );
                    })}
                </Box>
            </Box>
        );
    };

    return (
        <>
            {/* 🔘 Trigger */}
            <Box
                onClick={handleToggle}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    px: 1.5,
                    py: 0.6,
                    border: "1px solid",
                    cursor: "pointer",
                    fontSize: "16px",
                    borderColor: isActive ? "#000" : "#EEEEEE",
                    backgroundColor: isActive ? "#1c1c1c" : "#fff",
                    color: isActive ? "#fff" : "#707070",
                    "&:hover": {
                        backgroundColor: isActive ? "#222" : "#f2f2f2",
                    },
                }}
            >
                AlphaDecode Rating

                {isActive && (
                    <CloseIcon
                        onClick={(e) => {
                            e.stopPropagation();
                            setAlphadecodeFilter(DEFAULT_FILTER);
                        }}
                        sx={{
                            fontSize: "14px",
                            ml: 0.5,
                            color: "#fff",
                        }}
                    />
                )}

                <KeyboardArrowDownIcon
                    sx={{
                        fontSize: "14px",
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                        color: isActive ? "#fff" : "#707070",
                    }}
                />
            </Box>

            {/* 📦 Dropdown */}
            <Popper open={open} anchorEl={anchorEl} placement="bottom-start" transition
                    sx={{zIndex: 9999, maxHeight: 400, width: 320}}>
                {({TransitionProps}) => (
                    <Grow {...TransitionProps} timeout={200}>
                        <Paper
                            sx={{
                                width: 320,
                                p: 2,
                                mt: 0.5,
                                border: "1px solid #EEEEEE",
                                boxShadow: "0px 4px 10px #00000040",
                                maxHeight: 600,
                            }}
                        >
                            <ClickAwayListener onClickAway={handleClose}>
                                <Box>
                                    {/* Header */}
                                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1} pb={1}
                                         borderBottom="1px solid #eee">
                                        <Typography fontWeight={600} fontSize="14px">
                                            AlphaDecode Rating
                                        </Typography>

                                        <IconButton size="small" onClick={handleReset}>
                                            <DeleteOutlineIcon fontSize="small"/>
                                        </IconButton>
                                    </Box>

                                    <Range label="Price Rating" valueKey="price"/>
                                    <Range label="Sector Price Rating" valueKey="sector"/>
                                    <Range label="Earning Rating" valueKey="earning"/>

                                    <RatingGroup label="Institutional Rating" valueKey="institutional"/>
                                    <RatingGroup label="SMR Rating" valueKey="smr"/>

                                    {/* ✅ Footer */}
                                    <Box display="flex" justifyContent="flex-end" mt={2} pt={1}
                                         borderTop="1px solid #eee">
                                        <Button size="small" variant="contained" onClick={handleSave} sx={{
                                            color: "#ffffff",
                                            backgroundColor: "#3c3b3b",
                                            "&:hover": {
                                                backgroundColor: "#6a6767",
                                            },
                                            fontWeight:600
                                        }}>
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