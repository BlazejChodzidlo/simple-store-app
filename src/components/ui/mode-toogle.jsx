"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  function handleThemeChange() {
    if (theme === "dark") {
        setTheme('light')
    }
    else {
        setTheme('dark')
    }
  }

  return (
    <DropdownMenuCheckboxItem checked={theme === "dark" ? true : false} onCheckedChange={handleThemeChange}>
        Dark mode
    </DropdownMenuCheckboxItem>
  )
}
