export class User {
    constructor(
        public password: string,
        public email: string,
        public userName?: string,
        public firstname?: string,
        public lastname?: string
    ) {}
}