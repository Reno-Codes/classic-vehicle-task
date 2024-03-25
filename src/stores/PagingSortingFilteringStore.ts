import { action, makeObservable, observable } from "mobx";

export class PagingSortingFilteringStore {
    currentPage: number = 1;
    selectedModel: string = "";
    selectedSortColumn: string = "";
    sortAscending: boolean = true;
    selectedFilter: string = "";

    constructor() {
        makeObservable(this, {
            currentPage: observable,
            setCurrentPage: action,
            selectedModel: observable,
            setSelectedModel: action,
            selectedSortColumn: observable,
            setSelectedSortColumn: action,
            sortAscending: observable,
            setSortAscending: action,
            selectedFilter: observable,
            setSelectedFilter: action,
        });

        this.setCurrentPage = this.setCurrentPage.bind(this);
        this.setSelectedModel = this.setSelectedModel.bind(this);
        this.setSelectedSortColumn = this.setSelectedSortColumn.bind(this);
        this.setSortAscending = this.setSortAscending.bind(this);
        this.setSelectedFilter = this.setSelectedFilter.bind(this);
    }

    setCurrentPage(page: number) {
        this.currentPage = page;
    }

    setSelectedModel(model: string) {
        this.selectedModel = model;
    }

    setSelectedSortColumn(sortColumn: string) {
        this.selectedSortColumn = sortColumn;
    }

    setSortAscending(ascending: boolean) {
        this.sortAscending = ascending;
    }

    setSelectedFilter(filter: string) {
        this.selectedFilter = filter;
    }
}

const pagingSortingFilteringStore = new PagingSortingFilteringStore();
export default pagingSortingFilteringStore;
