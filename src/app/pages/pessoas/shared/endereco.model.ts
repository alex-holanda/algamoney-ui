export class Endereco {
  constructor(
    public logradouro?: string,
    public numero?: string,
    public complemento?: string,
    public bairro?: string,
    public cep?: string,
    public cidade?: string,
    public estado?: string
  ) { }
}
