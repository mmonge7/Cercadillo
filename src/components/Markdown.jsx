import React, { useMemo } from 'react';
import { toBlocks } from '../utils/markdownBlocks';
import { slugify } from '../utils/slugify';

/*
 * Pinta los textos de src/content (markdown) como elementos reales de React,
 * en vez de mostrarlos en crudo con los asteriscos a la vista. Se hace a mano
 * en lugar de con una librería para no meter un parser completo en el bundle
 * de una web que debe abrirse al instante y funcionar sin conexión.
 */

const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

function renderInline(text, keyPrefix) {
  return String(text)
    .split(INLINE)
    .filter(Boolean)
    .map((part, i) => {
      const key = `${keyPrefix}-${i}`;

      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={key}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={key}>{part.slice(1, -1)}</em>;
      }

      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const external = /^https?:\/\//.test(link[2]);
        return (
          <a key={key} href={link[2]} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {link[1]}
          </a>
        );
      }

      return <React.Fragment key={key}>{part}</React.Fragment>;
    });
}

export default function Markdown({ content, className }) {
  const blocks = useMemo(() => toBlocks(content), [content]);

  return (
    <div className={className}>
      {blocks.map((block, i) => {
        if (block.type === 'h2') {
          return (
            <h2 key={i} id={slugify(block.text)} className="scroll-mt-24">
              {renderInline(block.text, `h2-${i}`)}
            </h2>
          );
        }
        if (block.type === 'h3' || block.type === 'h4') {
          const Heading = block.type;
          return <Heading key={i}>{renderInline(block.text, `${block.type}-${i}`)}</Heading>;
        }
        if (block.type === 'ul' || block.type === 'ol') {
          const List = block.type;
          return (
            <List key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{renderInline(item, `li-${i}-${j}`)}</li>
              ))}
            </List>
          );
        }
        return <p key={i}>{renderInline(block.text, `p-${i}`)}</p>;
      })}
    </div>
  );
}
