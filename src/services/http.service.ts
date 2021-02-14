export class HttpService {
  static headers = { 'Content-Type': 'application/json' };

  static get(url: string): Promise<any> {
    return fetch(url, {
      method: 'GET',
      headers: this.headers
    });
  }

  static post<T>(url: string, body: T): Promise<any> {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.headers
    });
  }
}