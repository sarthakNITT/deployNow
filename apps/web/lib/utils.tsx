import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export const MotionDiv = motion.div as any
export const MotionHeader = motion.header as any
export const MotionP = motion.p as any
export const MotionH1 = motion.h1 as any

export const PlusIcon = Plus as any

export type UserButtonNav = "dashboard" | "settings"