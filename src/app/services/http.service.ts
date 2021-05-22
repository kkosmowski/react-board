interface HttpHeaders {
  [key: string]: string;
}

export class HttpService {
  static headers = (token: string): HttpHeaders => {
    let baseHeaders: HttpHeaders = {
      'Content-Type': 'application/json',
    };

    return token.length
      ? {
        ...baseHeaders,
        'Authorization': `Token ${ token }`
      }
      : baseHeaders;
  };

  static get(url: string, token = ''): Promise<any> {
    return fetch(url, {
      method: 'GET',
      headers: this.headers(token)
    }).then(this.toJSON);
  }

  static post<T>(url: string, body: T, token = ''): Promise<any> {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.headers(token)
    }).then(this.toJSON);
  }

  static patch<T>(url: string, body: T, token = ''): Promise<any> {
    return fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: this.headers(token),
    }).then(this.toJSON);
  }

  private static toJSON = ((response: Response): Promise<any> => response.json());
}