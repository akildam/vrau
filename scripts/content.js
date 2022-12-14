$("tr:visible").each(function (index) {
    if (index == 0) return; // não coloca o botão na primeira linha
    
    id = "arquivos_" + index;
    protocolo = $(this).find('td:nth-child(2)').html();
    projeto = parseInt($('#AF8_PROJET').val().trim());

    $(this).find('td:nth-child(5)').html(
        "<button class='btnArquivos btn btn-primary btn-xs' arquivos='" + id + "' protocolo='"+protocolo+"' projeto='"+projeto+"'>Baixar todos</button><br><span id='" + id + "'>"
        + $(this).find('td:nth-child(5)').html()
        + "</span>"
    );
});

$('.btnArquivos').on('click', function () {
    id = $(this).attr('arquivos');
    protocolo = $(this).attr('protocolo');
    projeto = $(this).attr('projeto');
    arquivosParaDownload = [];
    $('#'+id).find("a").each(function (index) {
        indice = index + 1;
        arquivo = $(this).attr('href');
        if (arquivo != undefined) {
            extensao = arquivo.substr(arquivo.lastIndexOf('.') + 1);
            numero = indice < 10 ? ('00' + indice) : ('0' + indice);
            novoNome = numero + ' - ' + protocolo + ' - ' + projeto + '.' + extensao;
            arquivosParaDownload.push({
                projeto: projeto,
                protocolo: protocolo,
                url: arquivo,
                filename: novoNome
            });
        }
    });
    chrome.runtime.sendMessage({arquivos: arquivosParaDownload});
})

