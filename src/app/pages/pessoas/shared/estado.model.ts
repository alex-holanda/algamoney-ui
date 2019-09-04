export class Estado {

  constructor(
    public codigo?: number,
    public nome?: string
  ) {

  }

  static fromJson(jsonData: any): Estado {
    return Object.assign(new Estado(), jsonData);
  }

  static fromJsonDataToResources(jsonData: any): Array<Estado> {
    const estados: Array<Estado> = [];
    jsonData.forEach( e => estados.push(Estado.fromJson(e)) );
    return estados;
  }

}
