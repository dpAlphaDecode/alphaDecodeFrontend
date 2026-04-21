import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DropdownFilter = ({ label }) => {
  const dummyOptions = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex  items-center bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium hover:bg-gray-50 focus:outline-none">
        {label} <ChevronDown className="ml-1 h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white">
        {dummyOptions.map((opt, index) => (
          <DropdownMenuItem key={index} className="cursor-pointer">
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownFilter;