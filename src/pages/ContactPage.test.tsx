import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactPage, { createMessage } from './ContactPage';

vi.mock('../hooks/useScrollTL', () => ({ useScrollTL: () => undefined }));
vi.mock('../components/MotionProvider', () => ({ useMotionSettings: () => ({ reduced: true, coarse: true, ready: true }) }));
vi.mock('../lib/motion', () => ({ gsap: { to: vi.fn(), killTweensOf: vi.fn() } }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe('contato sem envio automático', () => {
  it('preserva o texto do visitante e remove espaços nas extremidades', () => {
    expect(createMessage('  Ana  ', 'Design visual', '  Quero criar uma identidade para meu projeto.  '))
      .toBe('Oi, Leo! Sou Ana.\n\nQuero conversar sobre design visual.\n\nQuero criar uma identidade para meu projeto.');
  });
  it('prepara uma mensagem editável no formulário e só copia mediante ação explícita', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    render(<MemoryRouter><ContactPage /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText('01 / COMO VOCÊ SE CHAMA?'), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText('03 / ME CONTA UM POUCO MAIS'), { target: { value: 'Quero criar uma identidade para um projeto pessoal.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Preparar mensagem' }));
    expect(screen.getByLabelText('Mensagem pronta para copiar')).toBeTruthy();
    expect(writeText).not.toHaveBeenCalled();
    expect(screen.getByRole('status').textContent).toContain('ainda não foi enviada');
    fireEvent.click(screen.getByRole('button', { name: 'Copiar mensagem' }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    expect(screen.getByRole('link', { name: 'Abrir Instagram' }).getAttribute('href')).toBe('https://www.instagram.com/realleocarvalho/');
  });
  it('oferece cópia manual se a área de transferência estiver indisponível', async () => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: vi.fn().mockRejectedValue(new Error('blocked')) } });
    render(<MemoryRouter><ContactPage /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText('01 / COMO VOCÊ SE CHAMA?'), { target: { value: 'Bruno' } });
    fireEvent.change(screen.getByLabelText('03 / ME CONTA UM POUCO MAIS'), { target: { value: 'Tenho uma ideia de site e gostaria de conversar.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Preparar mensagem' }));
    fireEvent.click(screen.getByRole('button', { name: 'Copiar mensagem' }));
    await waitFor(() => expect(screen.getByRole('status').textContent).toContain('copie e cole'));
  });
});
