export class Categoria {
  constructor(
    public codigo?: number
  ) { }

  static fromJson(jsonData: any) {
    return Object.assign(new Categoria(), jsonData);
  }
}
