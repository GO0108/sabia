# Diferença entre os Modelos:

## Modelo retrieval com NLTK:
É o modelo mais simples de chatbot, o usuário insere um input e buscamos esse input dado em nosso banco de dados. Apesar da simples implementação, o modelo pode não interpretar inputs fornecidos a não ser que eles sejam idênticos as palavras chave esperadas.

## Modelo retrieval Bag of Words:
Similar ao modelo anterior, esse modelo funciona utilizando uma simples rede neural multilayer perceptron. Agora, o chatbot pode compreender e interpretar um poucos mais inputs diferentes que o usuário oferece, mas ainda é um modelo retrieval, isto é, somente retorna respostas previamente anotadas.

## Modelo usando a API do ChatGPT:
Agora, o chatbot é baseado em um modelo generativo: as respostas são geradas pelo próprio modelo. Além disso, o modelo permite uma melhor interpretação dos inputs fornecidos pelo usuário, ou seja, o modelo entende muito bem o que o usuário pergunta. Apesar disso, o modelo generativo não tem a garantia de respostas precisas e objetivas ao que o usuário requisita, e, diferentemente dos modelos anteriores, não possui uma implementação tão simples fora da API da OpenAI.
