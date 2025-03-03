import { atom } from "jotai";
import type { Skill, SkillCategory } from "@saedgewell/types";

/**
 * スキル一覧を管理するatom
 */
export const skillsAtom = atom<Skill[]>([]);

/**
 * スキルカテゴリー一覧を管理するatom
 */
export const categoriesAtom = atom<SkillCategory[]>([]);
