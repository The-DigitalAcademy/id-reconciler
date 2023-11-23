export function categorySorter(
  a: { type: string; id: string },
  b: { type: string; id: string }
): number {
  if (a.id === "6a21761b-76ff-4923-915b-079f85d150aa" || b.id === "6a21761b-76ff-4923-915b-079f85d150aa"){
    return -1
  }
  return 0
}
