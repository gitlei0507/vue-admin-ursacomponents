export const useUrsaSearch = (searchForm, onSearch, onReset) => {
    const resetSearch = () => {
        if (searchForm) {
            Object.keys(searchForm).forEach((key) => {
                searchForm[key] = ''
            })
        }

        if (typeof onReset === 'function') {
            onReset()
        }

        if (typeof onSearch === 'function') {
            onSearch()
        }
    }

    return {
        resetSearch
    }
}
