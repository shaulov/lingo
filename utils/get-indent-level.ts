import { CYCLE_LENGTH, RIGHT_INDENT_CONST } from "@/const";

export const getIndentLevel = (index: number) => {
  const cycleIndex = index % CYCLE_LENGTH;
  let indentLevel;

  if (cycleIndex <= 2) {
    indentLevel = cycleIndex;
  } else if (cycleIndex <= 6) {
    indentLevel = 4 - cycleIndex;
  } else {
    indentLevel = cycleIndex - 8;
  }

  return indentLevel;
};

export const getLessonRightPosition = (index: number) => {
  return getIndentLevel(index) * RIGHT_INDENT_CONST;
}
