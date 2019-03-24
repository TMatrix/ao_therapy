// export class User {
//     id: number;
//     username: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     token: string;
// }

export interface User {
	id: number;
	name: string;
	email: string;
}

export interface AuthenticatedUser {
	token: string;
	user: User;
}
