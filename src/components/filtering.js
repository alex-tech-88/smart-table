export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
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
    };

    const applyFiltering = (query, state, action) => {
        if (action && action.name === "clear") {
            const field = action.dataset.field;
            const wrapper = action.parentElement;
            const input = wrapper?.querySelector(`[name="${field}"]`);

            if (input) input.value = "";
            if (field in state) state[field] = "";
        }

        const filter = {};
        Object.keys(elements).forEach((key) => {
            if (!elements[key]) return;

            if (["INPUT", "SELECT"].includes(elements[key].tagName) && elements[key].value) {
                filter[`filter[${elements[key].name}]`] = elements[key].value;
            }
        });

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;
    };

    return {
        updateIndexes,
        applyFiltering,
    };
}
