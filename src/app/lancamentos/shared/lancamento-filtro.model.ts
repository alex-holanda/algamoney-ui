export class LancamentoFiltro {
  constructor(
    public descricao?: string,
    public dataVencimentoInicio?: Date,
    public dataVencimentoFim?: Date,
    public pagina = 0,
    public itensPorPagina = 5
  ) { }
}
