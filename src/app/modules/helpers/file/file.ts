export class File {
	constructor(
		public id?: number,
		public name?: string,
		public container?: string,
		public type?: string,
		public size?: number,
		public eventId?: number,
		public lastModifiedDate?: Date,
		public created?: Date
	) {

	}
}
