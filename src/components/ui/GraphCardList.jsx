"use client";

import { useState, useCallback, useMemo } from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Collapse,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  CalendarToday,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

import GraphCard from "./GraphCard";
import { graphCardsData } from "../data/graphData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const GraphCardList = () => {
  const [isVisibleGraph, setIsVisibleGraph] = useState(false);
  const theme = useTheme();

  // Responsive breakpoints using MUI theme
  const isXsScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMdScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));

  // Memoize the toggle handler to prevent unnecessary re-renders
  const handleToggleGraph = useCallback(() => {
    setIsVisibleGraph(prev => !prev);
  }, []);

  // Memoize Swiper configuration with responsive logic
  const swiperConfig = useMemo(() => {
    let slidesPerView = 4;
    let spaceBetween = 30;

    if (isXsScreen) {
      slidesPerView = 1;
      spaceBetween = 16;
    } else if (isSmScreen) {
      slidesPerView = 2;
      spaceBetween = 20;
    } else if (isMdScreen) {
      slidesPerView = 3;
      spaceBetween = 24;
    }

    return {
      slidesPerView,
      spaceBetween,
      freeMode: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      loop: graphCardsData.length > slidesPerView,
      modules: [Autoplay, FreeMode, Pagination],
      className: "mySwiper",
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        600: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    };
  }, [isXsScreen, isSmScreen, isMdScreen]);

  // Memoize the slides to prevent unnecessary re-renders
  const slides = useMemo(
    () =>
      graphCardsData.map((card, index) => (
        <SwiperSlide key={card.id || `slide-${index}`}>
          <GraphCard
            title={card.title}
            value={card.value}
            change={card.change}
            data={card.data}
          />
        </SwiperSlide>
      )),
    []
  );

  return (
    <Paper
      elevation={1}
      sx={{
        overflow: 'hidden',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Header Section */}
      <Box
        component="header"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: 2,
          borderBottom: 1,
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            fontSize: '24px',
          }}
        >
          Stock Screener
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {/* Calendar Button */}
          <IconButton
            size="medium"
            aria-label="Select date range"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              '&:focus': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '2px',
              },
            }}
          >
            <CalendarToday fontSize="small" />
          </IconButton>

          {/* Expand/Collapse Button */}
          <IconButton
            size="medium"
            onClick={handleToggleGraph}
            aria-label={isVisibleGraph ? "Hide graphs" : "Show graphs"}
            aria-expanded={isVisibleGraph}
            sx={{
              color: 'text.secondary',
              transform: isVisibleGraph ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.short,
              }),
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              '&:focus': {
                outline: `2px solid ${theme.palette.primary.main}`,
                outlineOffset: '2px',
              },
            }}
          >
            {isVisibleGraph ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      </Box>

      {/* Graph Cards Section with Collapse Animation */}
      <Collapse
        in={isVisibleGraph}
        timeout="auto"
        unmountOnExit
        sx={{
          '& .MuiCollapse-wrapper': {
            width: '100%',
          },
        }}
      >
        <Box
          component="section"
          role="region"
          aria-label="Stock performance graphs"
          sx={{
            p: 3,
            backgroundColor: 'background.default',
          }}
        >
          <Box
            sx={{
              overflow: 'hidden',
              '& .mySwiper': {
                width: '100%',
                height: '100%',
              },
              '& .swiper-slide': {
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
              },
            }}
          >
            <Swiper {...swiperConfig}>
              {slides}
            </Swiper>
          </Box>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default GraphCardList;