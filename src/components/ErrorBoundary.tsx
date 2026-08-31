import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Texto corto que describe qué se ha roto (p. ej. "el buscador", "el mapa"). */
  label?: string;
};

type State = { hasError: boolean };

/**
 * Aísla los fallos de una isla React concreta: si algo dentro de `children`
 * lanza un error al renderizar, se muestra un aviso en su lugar en vez de
 * romper la página entera (el resto de la web sigue siendo usable).
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', this.props.label ?? 'componente', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-2xl border border-piedra-border/60 bg-pergamino-muted p-4 text-sm text-tinta/75 dark:border-noche-border dark:bg-noche-surface dark:text-pergamino-muted/75"
        >
          <span aria-hidden="true">⚠️</span>
          <span>
            No se ha podido cargar {this.props.label ?? 'esta sección'} ahora mismo. El resto de la web sigue
            funcionando con normalidad.
          </span>
        </div>
      );
    }
    return this.props.children;
  }
}
