Dia 03: Unix & Bash - Parte 01
Parte I - Criação de arquivos e diretórios
Exercícios
Dica : Para criação de arquivos vazios você pode utilizar o comando touch nome-do-arquivo.extensao .

Utilizando o terminal, aplique o comando de criação de diretórios que você aprendeu, crie um diretório chamado unix_tests e navegue até ele.

Crie um arquivo de texto com o nome trybe.txt .

Crie uma cópia do arquivo trybe.txt com nome trybe_backup.txt .

Renomeie o arquivo trybe.txt .

Dentro de unix_tests , crie um novo diretório chamado backup .

Mova o arquivo trybe_backup.txt para o diretório backup .

Dentro de unix_tests , crie um novo diretório chamado backup2 .

Mova o arquivo trybe_backup.txt da pasta backup para a pasta backup2 .

Apague a pasta backup .

Renomeie a pasta backup2 para backup .

Veja qual o path completo do diretório atual e liste todos os arquivos dentro dele.

Apague o diretório backup .

Limpe o terminal.

Para os exercícios 14 e 15, crie, de forma manual na parte gráfica do seu sistema operacional (através do mouse), um arquivo de texto com o conteúdo abaixo, chamado skills.txt :

Internet
Unix
Bash
HTML
CSS
JavaScript
React
SQL
Mostre na tela as 5 primeiras skills do arquivo skills.txt .

Mostre na tela as 4 últimas skills do arquivo skills.txt .

Apague todos os arquivos que terminem em .txt .

Parte II - Manipulação & Busca
Na pasta unix_tests , baixe um arquivo com os nomes de todos os países do mundo utilizando o comando curl:
Copiar

curl -o countries.txt "https://gist.githubusercontent.com/kalinchernev/486393efcca01623b18d/raw/daa24c9fea66afb7d68f8d69f0c4b8eeb9406e83/countries"
Mostre todo o conteúdo do arquivo countries.txt na tela.

Mostre o conteúdo de countries.txt , página por página, até encontrar a Zambia .

Mostre novamente o conteúdo de countries.txt página por página, mas agora utilize um comando para buscar por Zambia .

Busque por Brazil no countries.txt .

Busque novamente por brazil , mas agora utilizando o lower case .

Para os próximos exercícios, crie um novo arquivo chamado phrases.txt e adicione algumas frases à sua escolha. Não precisa criar o arquivo pelo terminal.

Busque pelas frases que não contenham a palavra fox .

Conte o número de palavras do arquivo phrases.txt .

Conte o número de linhas do arquivo phrases.txt .

Crie os arquivos empty.tbt e empty.pdf .

Liste todos os arquivos do diretório unix_tests .

Liste todos os arquivos que terminem com txt .

Liste todos os arquivos que terminem com tbt ou txt .

Acesse o manual do comando ls .
