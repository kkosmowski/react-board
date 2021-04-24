import { RegisterFormData } from '@interfaces';
import { ActionFunction, Dispatch } from '@types';
import { UsersActions } from '@store/actions';
import { HttpService } from '@services';
import { endpoint } from '@utils';

export function createAccount(formData: RegisterFormData): ActionFunction<Promise<void>> {
  return function (dispatch: Dispatch): Promise<void> {
    dispatch({ type: UsersActions.CREATE_ACCOUNT });
    return HttpService
      .post<RegisterFormData>(endpoint.register, formData)
      .then((response) => {
        dispatch({ type: UsersActions.CREATE_ACCOUNT_SUCCESS });
        return response;
      }).catch(() => {
        dispatch({ type: UsersActions.CREATE_ACCOUNT_FAIL });
      });
  };
}