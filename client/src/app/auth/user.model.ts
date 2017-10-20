export class User {
    constructor(
        public userName: string,
        public password: string,
        public email?: string,
        public firstname?: String,
        public lastname?: string,
    ) {}
}