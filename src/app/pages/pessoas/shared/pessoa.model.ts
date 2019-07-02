import { Endereco } from './endereco.model';

export class Pessoa {
  constructor(
    public codigo?: number,
    public nome?: string,
    public ativo?: boolean,
    public endereco?: Endereco
  ) { }

  static fromJson(jsonData: any): Pessoa {
    return Object.assign(new Pessoa(), jsonData);
  }
}
