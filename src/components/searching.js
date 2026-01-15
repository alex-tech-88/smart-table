import { rules, createComparison } from "../lib/compare.js";

export function initSearching(searchField) {
    // Компаратор: пропускаем пустой поиск + правило поиска по нескольким полям
    const compare = createComparison(
        ["skipEmptyTargetValues"],
        [rules.searchMultipleFields(searchField, ["date", "customer", "seller"], false)]
    );

    return (data, state, action) => {
        return data.filter((row) => compare(row, state));
    };
}
