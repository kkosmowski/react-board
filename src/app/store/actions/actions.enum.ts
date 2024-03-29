export enum SessionActions {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  LOGIN_FAIL = 'LOGIN_FAIL',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGOUT = 'LOGOUT',
  GET_CURRENT_USER = 'GET_CURRENT_USER',
  GET_CURRENT_USER_FAIL = 'GET_CURRENT_USER_FAIL',
  GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS',
  FIND_SESSION = 'FIND_SESSION',
  NO_SESSION_FOUND = 'NO_SESSION_FOUND',
  SESSION_FOUND = 'SESSION_FOUND',
  SESSION_SAVED = 'SESSION_SAVED',
  SESSION_PERSISTED = 'SESSION_PERSISTED',
  CREATE_ACCOUNT = 'CREATE_ACCOUNT',
  CREATE_ACCOUNT_FAIL = 'CREATE_ACCOUNT_FAIL',
  CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS',
}

export enum UserActions {
  GET_USER = 'GET_USER',
  GET_USER_FAIL = 'GET_USER_FAIL',
  GET_USER_SUCCESS = 'GET_USER_SUCCESS',
}

export enum CategoryActions {
  GET_CATEGORIES = 'GET_CATEGORIES',
  GET_CATEGORIES_FAIL = 'GET_CATEGORIES_FAIL',
  GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS',
  GET_CATEGORY = 'GET_CATEGORY',
  GET_CATEGORY_FAIL = 'GET_CATEGORY_FAIL',
  GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS',
  GET_THREADS = 'GET_THREADS',
  GET_THREADS_FAIL = 'GET_THREADS_FAIL',
  GET_THREADS_SUCCESS = 'GET_THREADS_SUCCESS',
  CREATE_THREAD = 'CREATE_THREAD',
  CREATE_THREAD_FAIL = 'CREATE_THREAD_FAIL',
  CREATE_THREAD_SUCCESS = 'CREATE_THREAD_SUCCESS',
  CLEAR_CATEGORY = 'CLEAR_CATEGORY',
}

export enum ThreadActions {
  ADD_REPLY = 'ADD_REPLY',
  ADD_REPLY_FAIL = 'ADD_REPLY_FAIL',
  ADD_REPLY_SUCCESS = 'ADD_REPLY_SUCCESS',
  GET_THREAD = 'GET_THREAD',
  GET_THREAD_FAIL = 'GET_THREAD_FAIL',
  GET_THREAD_SUCCESS = 'GET_THREAD_SUCCESS',
  GET_POSTS = 'GET_POSTS',
  GET_POSTS_FAIL = 'GET_POSTS_FAIL',
  GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS',
  CLEAR_THREAD = 'CLEAR_THREAD',
}

export enum BreadcrumbsActions {
  SET_BREADCRUMBS = 'SET_BREADCRUMBS',
  POP_BREADCRUMB = 'POP_BREADCRUMB',
}