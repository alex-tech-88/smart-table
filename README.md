# Smart Table

An interactive data table for browsing and analyzing sales records: full-text search, multi-field filtering, column sorting, and pagination. The project was built in two stages — first with client-side data processing, then refactored to work with a remote REST API.

## Features

- Full-text search across multiple record fields (date, customer, seller)
- Filtering by seller, customer, and date/amount range, with per-field reset support
- Column sorting with a visual direction indicator and automatic reset of other columns' sort state
- Pagination with a visible page range and a "showing X of Y" status
- Asynchronous data fetching from the server with caching of repeated requests

## Tech Stack

- Vanilla JavaScript (ES modules), no frameworks
- Vite as the build tool
- Fetch API for server communication
- Custom compare/sort utilities used during the client-side processing stage

## Architecture

The project follows a data-processing pipeline pattern: form state (`collectState`) is collected from the table's fields, then passed sequentially through the `searching → filtering → sorting → pagination` modules. In the client-side version these modules filter and sort the array directly; in the server-side version they build a query-parameters object for the API request instead.

```
src/
├── components/
│   ├── table.js       — row rendering, mounting extra blocks, form event handling
│   ├── searching.js   — full-text search
│   ├── filtering.js   — field-based filtering
│   ├── sorting.js     — column sorting
│   └── pagination.js  — page navigation
├── data.js            — data fetching (local dataset or remote API)
├── lib/               — helper utilities (compare, sort, utils)
└── main.js            — entry point, assembles the processing pipeline
```

## Key Refactor

The initial version processed the entire dataset on the client: searching, filtering, sorting, and page slicing all ran in the browser against a local JSON dataset. In the second version this logic was moved to the server — components no longer mutate the data directly; instead they build query parameters (`search`, `filter[...]`, `sort`, `limit`, `page`), and a single async call to `getRecords(query)` returns an already filtered and sorted page of data. This solves the scalability problem: performance no longer depends on the size of the source dataset.

## Getting Started

```bash
npm install
npm run dev
```

## Author

[alex-tech-88](https://github.com/alex-tech-88)
