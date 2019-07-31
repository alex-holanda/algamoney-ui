export class Categoria {
  constructor(
    public codigo?: number,
    public nome?: string
  ) { }

  static fromJson(jsonData: any) {
    return Object.assign(new Categoria(), jsonData);
  }
}
