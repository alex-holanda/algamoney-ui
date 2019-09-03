import { Estado } from './estado.model';

export class Cidade {
  constructor(
    public codigo?: number,
    public estado?: Estado,
    public nome?: string
  ) { }

  static fromJson(jsonData: any): Cidade {
    return Object.assign(new Cidade(), jsonData);
  }

  static jsonDataToResources(jsonData: Array<any>): Array<Cidade> {
    const cidades: Array<Cidade> = [];
    jsonData.forEach( e => cidades.push(Cidade.fromJson(e)) );
    return cidades;
  }
}
