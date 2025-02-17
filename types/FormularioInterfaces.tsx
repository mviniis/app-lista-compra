export interface BotaoCadastrarProps {
  label: string;
  action?: () => void;
  estilos ?: object
};

export interface InputTextProps {
  label: string;
  valor: string;
  tipo: string;
  desabilitar?: boolean;
  actionAtualizarValor: (texto: string) => void;
  estilosBox ?: object;
  estilosInput ?: object;
}