import { useState, type FormEvent } from 'react';
import { isValidPhone, maskPhone } from '../../../lib/format';

interface DetailsStepProps {
  name: string;
  phone: string;
  onName: (v: string) => void;
  onPhone: (v: string) => void;
  onSubmit: () => void;
}

export function DetailsStep({ name, phone, onName, onPhone, onSubmit }: DetailsStepProps) {
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = 'Digite seu nome.';
    if (!isValidPhone(phone)) next.phone = 'Digite um WhatsApp com DDD, ex.: (11) 99999-9999.';
    setErrors(next);
    if (next.name) return document.getElementById('bk-name')?.focus();
    if (next.phone) return document.getElementById('bk-phone')?.focus();
    onSubmit();
  }

  return (
    <form id="bk-details" className="bk-form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="bk-name">Seu nome</label>
        <input
          id="bk-name"
          type="text"
          autoComplete="name"
          maxLength={50}
          value={name}
          onChange={(e) => onName(e.target.value)}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? 'bk-name-err' : undefined}
          placeholder="Ex.: Carlos Mendes"
        />
        {errors.name && <span className="field-error" id="bk-name-err">{errors.name}</span>}
      </div>
      <div className="field">
        <label htmlFor="bk-phone">WhatsApp</label>
        <input
          id="bk-phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={phone}
          onChange={(e) => onPhone(maskPhone(e.target.value))}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? 'bk-phone-err' : 'bk-phone-hint'}
          placeholder="(11) 99999-9999"
        />
        {errors.phone ? (
          <span className="field-error" id="bk-phone-err">{errors.phone}</span>
        ) : (
          <span className="field-hint" id="bk-phone-hint">É por aqui que chega o lembrete. (Demonstração: nada é enviado.)</span>
        )}
      </div>
    </form>
  );
}
