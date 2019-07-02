export class Pessoa {
  constructor(
    public codigo?: number,
    public nome?: string,
    public logradouro?: string,
    public numero?: string,
    public complemento?: string,
    public bairro?: string,
    public cep?: string,
    public cidade?: string,
    public estado?: string
  ) { }

  static fromJson(jsonData: any): Pessoa {
    return Object.assign(new Pessoa(), jsonData);
  }
}
