let zIndex: number = 1000;

export function nextZIndex(): number {
  zIndex += 1;
  return zIndex;
}
