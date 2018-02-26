export const getIndexOfRowFunctor = (totalCount, currentPage, limit) => (row, index) => ((totalCount - ((currentPage - 1) * limit) - index)); // eslint-disable-line import/prefer-default-export
