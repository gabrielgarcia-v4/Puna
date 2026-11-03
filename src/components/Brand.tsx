// Logo, símbolo e padrão da Puna como máscaras: a cor vem de `color`/`text-*`.
export function Logo({ className = "" }: { className?: string }) {
  return <span role="img" aria-label="Puna" className={`brand-logo ${className}`} />;
}

export function Simbolo({ className = "", label }: { className?: string; label?: string }) {
  return <span role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} className={`brand-simbolo ${className}`} />;
}

export function Padrao({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`brand-padrao ${className}`} />;
}

export function Palavra({ className = "" }: { className?: string }) {
  return <span role="img" aria-label="Puna" className={`brand-palavra ${className}`} />;
}
