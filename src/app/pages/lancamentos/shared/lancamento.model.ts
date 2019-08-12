import { Categoria } from 'src/app/pages/categorias/shared/categoria.model';
import { Pessoa } from 'src/app/pages/pessoas/shared/pessoa.model';

export class Lancamento {
  constructor(
    public codigo?: number,
    public  tipo?: string,
    public descricao?: string,
    public dataVencimento?: Date,
    public dataPagamento?: Date,
    public valor?: number,
    public pessoa?: Pessoa,
    public categoria?: Categoria,
    public observacao?: string,
    public anexo?: string,
    public urlAnexo?: string
  ) { }

  static tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  static fromJson(jsonData: any): Lancamento {
    return Object.assign(new Lancamento(), jsonData);
  }
}
