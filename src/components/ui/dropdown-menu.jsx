'use client';

import * as React from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";

export function DropdownMenu({ children }) {
  return <Menu as="div" className="relative inline-block text-left">{children}</Menu>;
}

export function DropdownMenuTrigger({ children, className }) {
  return (
    <MenuButton className={className}>
      {children}
    </MenuButton>
  );
}

export function DropdownMenuContent({ children, className }) {
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
      <MenuItems className={`absolute z-10 mt-2 w-48 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${className}`}>
        {children}
      </MenuItems>
    </Transition>
  );
}

export function DropdownMenuItem({ children, onClick, className }) {
  return (
    <MenuItem>
      {({ active }) => (
        <button
          onClick={onClick}
          className={`${
            active ? 'bg-gray-100' : ''
          } block w-full px-4 py-2 text-sm text-gray-700 text-left ${className}`}
        >
          {children}
        </button>
      )}
    </MenuItem>
  );
}
