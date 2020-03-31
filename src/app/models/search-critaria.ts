export class SearchCriteria {
    public key?: string;
    public operation?: string;
    public value?: Object;
    public page = 1;
    public size = 10;
    public orderBy: string;
    public orderDirection?: string;
    public categories?: string;
    public searchKey?: string;
}