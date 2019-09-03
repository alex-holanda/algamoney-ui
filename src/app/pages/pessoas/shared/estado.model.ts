export class Estado {

  constructor(
    public codigo?: number,
    public nome?: string
  ) {

  }

  static fromJson(jsonData: any): Estado {
    return Object.assign(new Estado(), jsonData);
  }

}
