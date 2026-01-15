import { createComparison, defaultRules } from "../lib/compare.js";

// #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes).forEach((elementName) => {
        if (!elements[elementName]) return;

        elements[elementName].append(
            ...Object.values(indexes[elementName]).map((name) => {
                const option = document.createElement("option");
                option.value = name;
                option.textContent = name;
                return option;
            })
        );
    });

    return (data, state, action) => {
        // #4.2 — обработать очистку поля (опционально, но полезно)
        if (action && action.name === "clear") {
            const field = action.dataset.field; // например "date" или "customer"
            const wrapper = action.parentElement; // кнопка лежит рядом с input внутри label
            const input = wrapper?.querySelector(`[name="${field}"]`);

            if (input) input.value = "";
            if (field in state) state[field] = "";
        }

        // #4.5 — отфильтровать данные используя компаратор
        return data.filter((row) => compare(row, state));
    };
}
