import { describe, expect, it } from 'vitest';
import { safeLink } from './utils';
import { projects } from '../data/projects';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

describe('URLs de projetos', () => {
  it('aceita destinos HTTP/HTTPS e rejeita protocolos executáveis', () => {
    expect(safeLink('https://github.com/realleokv')).toBe('https://github.com/realleokv');
    expect(safeLink('javascript:alert(1)')).toBeUndefined();
    expect(safeLink('data:text/html,test')).toBeUndefined();
    expect(safeLink('não é URL')).toBeUndefined();
    expect(safeLink(undefined)).toBeUndefined();
  });
});

describe('arquivo de projetos', () => {
  it('mantém rotas únicas e capas locais existentes', () => {
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    for (const project of projects) {
      expect(project.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(existsSync(resolve('public', project.cover.slice(1)))).toBe(true);
      expect(project.coverAlt.length).toBeGreaterThan(15);
      if (project.kind === 'placeholder') expect(project.liveUrl).toBeUndefined();
    }
  });
});
