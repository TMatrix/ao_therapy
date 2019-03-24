import { Observable } from 'rxjs';
import { AuthenticatedUser, User } from '@app/models/user.model';
import { ResponseScheme } from '@app/models/response-scheme.model';
import { Login } from '@app/models/login.model';

export interface UserDomain {
	login(payload: Login): Observable<ResponseScheme<AuthenticatedUser>>;
	get(payload: { id: string }): Observable<ResponseScheme<User>>;
	getAll(): Observable<ResponseScheme<User[]>>;
	verifyToken(payload: { token: string }): Observable<ResponseScheme<User>>;
}
