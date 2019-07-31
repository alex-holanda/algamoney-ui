export class LancamentoEstatisticaDia {
  constructor(
    public tipo?: string,
    public dia?: Date,
    public total?: number
  ) { }

  static fromJson(jsonData: any): LancamentoEstatisticaDia {
    return Object.assign(new LancamentoEstatisticaDia(), jsonData);
  }
}
