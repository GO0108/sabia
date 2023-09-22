from flask import Flask, jsonify, Response, request
from flask_cors import CORS, cross_origin
import wikipediaapi
import requests
from bs4 import BeautifulSoup
from serpapi import GoogleSearch
from IPython.display import Image
import logging
import json


app = Flask(__name__, static_folder="../frontend/build", static_url_path='')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-type'


@app.route('/')

@cross_origin()
def topicsMain():
    urlQuery = request.args.get('url', '')
    response = imprimir_referencias_multilingues(urlQuery)

    return response


# Função para buscar e imprimir referências de um artigo em diferentes idiomas
def imprimir_referencias_multilingues(consulta):

    case_list= []
    # Dicionário que mapeia os IDs das seções de referências em diferentes idiomas
    ids_referencias = {
        'pt': 'Referências',
        'en': 'References',
        'es': 'Referencias',
        'de': 'Einzelnachweise'
    }
    # Especifica o user agent
    user_agent = "SeuApp/1.0 (seu@email.com)"

    # Cria instâncias do WikipediaAPI para cada idioma
    wiki_en = wikipediaapi.Wikipedia(user_agent=user_agent, language='en')
    wiki_es = wikipediaapi.Wikipedia(user_agent=user_agent, language='es')
    wiki_de = wikipediaapi.Wikipedia(user_agent=user_agent, language='de')

    # Lista de idiomas para os quais você deseja buscar referências
    idiomas = ['pt', 'en', 'es', 'de']

    # Loop através dos idiomas
    for idioma in idiomas:
        # Cria instância do WikipediaAPI para o idioma atual
        wiki = wikipediaapi.Wikipedia(user_agent=user_agent, language=idioma)

        # Obtém a página do artigo na língua atual
        page = wiki.page(consulta)

        # Verifica se a página existe
        if page.exists():
            # Faz a requisição HTTP para a página da Wikipedia
            url = page.fullurl
            response = requests.get(url)

            # Cria o objeto BeautifulSoup
            soup = BeautifulSoup(response.text, 'html.parser')

            # Encontra a seção de referências usando o ID apropriado para o idioma
            references_section = soup.find('span', {'id': ids_referencias.get(idioma)})

            # Verifica se a seção existe
            if references_section is not None:
                # Encontra a lista de referências
                references_list = references_section.parent.find_next_sibling('ul')

                if references_list:
                    # Imprime o idioma atual e as referências do artigo
                    print(f"Referências em {idioma.capitalize()} para '{consulta}':")
                    for reference in references_list.find_all('li'):
                        # Extrai o texto da referência
                        reference_text = reference.text

                        # Extrai o link da referência, se houver
                        reference_link = reference.find('a')
                        if reference_link:
                            reference_link = reference_link.get('href')

                        # Imprime o texto e o link, se disponível
                        if reference_link:
                            
                            case = {'text': reference_text, 'link': reference_link}
                            case_list.append(case)

                            print(f"Texto: {reference_text}")
                            print(f"Link: {reference_link}\n")
                        else:
                            references['text'].append(reference_text)
                            print(f"Texto: {reference_text}\n")
                else:
                    print(f'Não há seção de Referências em {idioma.capitalize()} para este artigo.')
            else:
                print(f'Não foi possível encontrar a seção de Referências em {idioma.capitalize()} para este artigo.')
        else:
            print(f'Artigo não encontrado em {idioma.capitalize()} para a consulta: {consulta}')
    return json.dumps(case_list)

# Chama a função para buscar e imprimir as referências em diferentes idiomas