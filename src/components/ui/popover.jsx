"use client";

import { Fragment } from "react";
import {
  Popover as HeadlessPopover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

export function Popover({ children }) {
  return (
    <HeadlessPopover className="relative">
      {children}
    </HeadlessPopover>
  );
}

export function PopoverTrigger({ children, className }) {
  return (
    <PopoverButton
      className={className}
      as="button"
    >
      {children}
    </PopoverButton>
  );
}

export function PopoverContent({ children, className = "" }) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <PopoverPanel
        className={`absolute z-30 mt-2 w-96 origin-top-left rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${className}`}
      >
        {children}
      </PopoverPanel>
    </Transition>
  );
}
