export class User {
    constructor(
        public email: string,
        public password: string,
        public userName?: string,
        public firstname?: string,
        public lastname?: string
    ) {}
}