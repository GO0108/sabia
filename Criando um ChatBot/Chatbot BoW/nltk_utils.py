import numpy as np
import nltk
from unidecode import unidecode
    
# nltk.download('rslp')

# stemmer pt
stemmer = nltk.stem.RSLPStemmer()

def tokenize(sentence):
    # DIvide a frase em tokens (palavras)
    return nltk.word_tokenize(sentence)


def stem(word):
    """
    # Achar a raiz de cada palavra (assim, palavras como: Amava, Amarei, amaria --> ama)
    """
    # pre processa (retirar maiusculo e acentos)
    word = word.lower()
    word = stemmer.stem(word)
    return unidecode(word)


def bag_of_words(tokenized_sentence, words):
    # Retorna array de len(vocabulario) , e faz one hot encoding para as palavras presentes nesse array

    sentence_words = [stem(word) for word in tokenized_sentence]
    
    
    bag = np.zeros(len(words), dtype=np.float32)
    for idx, w in enumerate(words):
        if w in sentence_words: 
            bag[idx] = 1

    return bag