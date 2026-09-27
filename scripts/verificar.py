#!/usr/bin/env python3
"""Verificações do site N3X (sem dependências, Python 3.8+).

Uso:  python3 scripts/verificar.py

1. Blocos compartilhados (head, cabecalho, rodape) idênticos em todas as
   páginas. Os links "index.html#secao" das páginas secundárias equivalem
   aos links "#secao" da página inicial.
2. Links internos apontam para páginas existentes e âncoras (#id) existentes.
3. Arquivos locais referenciados (css, js, imagens, fontes) existem.
4. Cada página tem exatamente um <h1>.
5. Lista os elementos marcados com data-demo (dados de demonstração).

Sai com código 1 se algum problema for encontrado.
"""
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

PUBLICO = Path(__file__).resolve().parent.parent / 'public'
BLOCOS = ('head', 'cabecalho', 'rodape')


class Coletor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.refs, self.h1, self.demos = set(), [], 0, []
        self._pilha = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            self.ids.add(a['id'])
        for chave in ('href', 'src'):
            if a.get(chave):
                self.refs.append(a[chave])
        if tag == 'h1':
            self.h1 += 1
        if 'data-demo' in a:
            self.demos.append((tag, self.getpos()[0]))


def bloco(texto, nome):
    m = re.search(rf'<!-- ▼ BLOCO: {nome}[^>]*-->.*?<!-- ▲ BLOCO: {nome} -->', texto, re.S)
    return m.group(0).replace('href="index.html#', 'href="#') if m else None


def main():
    paginas = sorted(PUBLICO.glob('*.html'))
    textos = {p.name: p.read_text(encoding='utf-8') for p in paginas}
    coletas = {}
    for nome, texto in textos.items():
        c = Coletor()
        c.feed(texto)
        coletas[nome] = c
    problemas = []

    # 1. blocos
    referencia = textos['index.html']
    for nome_bloco in BLOCOS:
        base = bloco(referencia, nome_bloco)
        if base is None:
            problemas.append(f'index.html: bloco "{nome_bloco}" não encontrado')
            continue
        for nome, texto in textos.items():
            if bloco(texto, nome_bloco) != base:
                problemas.append(f'{nome}: bloco "{nome_bloco}" difere de index.html')

    # 2–4. links, arquivos, h1
    for nome, c in coletas.items():
        if c.h1 != 1:
            problemas.append(f'{nome}: {c.h1} <h1> (esperado 1)')
        for ref in c.refs:
            if ref.startswith(('http://', 'https://', 'mailto:', 'tel:', 'data:')):
                continue
            if ref.startswith('/'):
                problemas.append(f'{nome}: caminho absoluto {ref} (use caminho relativo)')
                continue
            caminho, _, ancora = ref.partition('#')
            caminho = caminho.split('?')[0]
            if not caminho:                      # âncora na própria página
                alvo = nome
            elif caminho.endswith('.html'):      # outra página
                alvo = caminho
            else:                                # arquivo (css, js, svg...)
                if not (PUBLICO / caminho).exists():
                    problemas.append(f'{nome}: arquivo inexistente {caminho}')
                continue
            if alvo not in coletas:
                problemas.append(f'{nome}: página inexistente {ref}')
            elif ancora and ancora not in coletas[alvo].ids:
                problemas.append(f'{nome}: âncora inexistente {ref}')

    # 5. dados de demonstração
    print('Dados de demonstração (data-demo):')
    for nome, c in coletas.items():
        for tag, linha in c.demos:
            print(f'  {nome}:{linha} <{tag}>')

    if problemas:
        print('\nProblemas encontrados:')
        for p in problemas:
            print('  ✗', p)
        return 1
    print(f'\n✓ {len(paginas)} páginas verificadas, nenhum problema.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
