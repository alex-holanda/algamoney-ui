import { Categoria } from 'src/app/pages/categorias/shared/categoria.model';

export class LancamentoEstatisticaCategoria {

  constructor(
    public categoria?: Categoria,
    public total?: number
  ) { }

  static fromJson(jsonData: any): LancamentoEstatisticaCategoria {
    return Object.assign(new LancamentoEstatisticaCategoria(), jsonData);
  }
}
