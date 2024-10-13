export const selectFiltersState = (state) => state.filters;
export const selectQueryParams = (state) => state.filters.params;
export const selectLevel = (state) => state.filters.params.level;
export const selectPrice = (state) => state.filters.params.price_per_hour;
export const selectLanguage = (state) => state.filters.params.language;
