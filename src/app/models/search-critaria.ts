export class SearchCriteria {
    public key?: string;
    public operation?: string;
    public value?: Object;
    public page = 0;
    public size = 9999999;
    public orderBy: string;
    public orderDirection?: string;
    public categories?: string;
    public searchKey?: string;
}