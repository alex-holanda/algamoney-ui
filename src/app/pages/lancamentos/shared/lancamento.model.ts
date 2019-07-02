export class Lancamento {
  constructor(
    public codigo?: number,
    public  tipo?: string,
    public descricao?: string,
    public dataVencimento?: Date,
    public dataPagamento?: Date,
    public valor?: number,
    public observacao?: string,
    public pessoaId?: number,
    public categoriaId?: number
  ) { }

  static tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  static fromJson(jsonData: any): Lancamento {
    return Object.assign(new Lancamento(), jsonData);
  }
}
