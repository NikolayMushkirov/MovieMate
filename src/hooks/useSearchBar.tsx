"use client";

import { useState } from "react";

const useSearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return { isOpen, handleToggle };
};

export default useSearchBar;
