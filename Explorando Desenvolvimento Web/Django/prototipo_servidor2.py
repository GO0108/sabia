# -*- coding: utf-8 -*-
"""Prototipo_Servidor2.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1RF8qcPR17IlrA4q66BdrdWpt4D1vA6oq
"""

!pip install pyngrok

from pyngrok import ngrok
ngrok_tunnel = ngrok.connect(8000)                     # Inicie o túnel para a porta 8000
print('URL do túnel:', ngrok_tunnel.public_url)

!mkdir -p ~/.config/ngrok/

!mv ~/.ngrok2/ngrok.yml ~/.config/ngrok/ngrok.yml