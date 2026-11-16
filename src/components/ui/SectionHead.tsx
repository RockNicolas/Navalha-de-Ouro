import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionHeadProps {
  eyebrow: string;
  number?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
}

export function SectionHead({ eyebrow, number, title, lead, id }: SectionHeadProps) {
  return (
    <Reveal as="header" className="section-head">
      <p className="eyebrow">
        {number && <span className="num">{number}</span>}
        {eyebrow}
      </p>
      <h2 id={id}>{title}</h2>
      {lead && <p className="lead">{lead}</p>}
    </Reveal>
  );
}
