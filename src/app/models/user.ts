export class User {
    constructor(
        public id?: string,
        public firstname?: string,
        public lastname?: string,
        public description?: string,
        public thumbnail?: File,
        public email?: string,
        public password?: string,
        public emailverified?: string,
        public role?: string,
        public roles?: any[],
        public type?: string,
        public call?: string,
        public adresse?: string,
        public created?: Date,
        public lastUpdated?: Date,
        public isActivated?: boolean,
    ) {

    }
}
