export class Contato {

  constructor(
    public codigo?: number,
    public nome?: string,
    public email?: string,
    public telefone?: string
  ) { }

  static fromJson(jsonData: any): Contato {
    return Object.assign(new Contato(), jsonData);
  }
}
