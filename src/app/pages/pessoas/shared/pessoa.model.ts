import { Contato } from './contato.model';
import { Endereco } from './endereco.model';

export class Pessoa {
  constructor(
    public codigo?: number,
    public nome?: string,
    public ativo?: boolean,
    public endereco?: Endereco,
    public contatos?: Array<Contato>
  ) { }

  static fromJson(jsonData: any): Pessoa {
    return Object.assign(new Pessoa(), jsonData);
  }
}
