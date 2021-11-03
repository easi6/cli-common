export const getIndexOfRowFunctor = (totalCount?: number, currentPage?: number, limit?: number) => (row: any, index: number) =>
  // @ts-ignore
  totalCount - (currentPage - 1) * limit - index;
