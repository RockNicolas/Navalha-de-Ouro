import { Icon } from '../ui/Icon';

const LABELS = ['Serviço', 'Profissional', 'Horário', 'Seus dados'];

interface StepIndicatorProps {
  step: number;
  done: boolean;
  onGoTo: (step: number) => void;
}

/** Barra de progresso; etapas já feitas viram atalho para voltar. */
export function StepIndicator({ step, done, onGoTo }: StepIndicatorProps) {
  return (
    <ol className="steps" aria-label="Etapas do agendamento">
      {LABELS.map((label, i) => {
        const complete = done || i < step;
        const current = !done && i === step;
        const content = (
          <>
            <span className="step-dot">{complete ? <Icon name="check" /> : i + 1}</span>
            <span className="step-label">{label}</span>
          </>
        );
        return (
          <li key={label} className={`${complete ? 'complete' : ''}${current ? ' current' : ''}`} aria-current={current ? 'step' : undefined}>
            {complete && !done ? (
              <button type="button" onClick={() => onGoTo(i)} aria-label={`Voltar para ${label}`}>
                {content}
              </button>
            ) : (
              <span className="step-static">{content}</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
