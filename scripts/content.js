projeto = parseInt($('#AF8_PROJET').val().trim());
$("tr:visible").each(function (index) {
    if (index == 0) return; // não coloca o botão na primeira linha
    
    id = "arquivos_" + index;
    protocolo = $(this).find('td:nth-child(2)').html();

    $(this).find('td:nth-child(5)').html(
        "<button class='btnArquivos btn btn-primary btn-xs' arquivos='" + id + "' protocolo='"+protocolo+"' projeto='"+projeto+"'>Baixar todos</button><br><span id='" + id + "'>"
        + $(this).find('td:nth-child(5)').html()
        + "</span>"
    );
});

// procura pela tabela #tableInteracoes a cada segundo
var tableInteracoesInterval = setInterval(buscarModalAberta, 1000);
function buscarModalAberta(){
    // ao encontrar o #tableInteracoes
    if($.trim($("#tableInteracoes").html())) {
        console.log('#tableInteracoes carregado. Parando o "tableInteracoesInterval".');

        clearInterval(tableInteracoesInterval);
        // adiciona o botão para download
        $('#tableInteracoes thead tr:nth-child(2) td:nth-child(2)').html(
            'Documentos <button class="btnBaixarInteracoes btn btn-sm btn-success"> <i class="fa fa-download"></i> Baixar todos</button>'
        );

        // Obtêm todas as URL's para download
        arquivosParaDownload = [];
        protocolo = $('#PCP_PROTOCOLO').val();
        contadorArquivos = 100; // Começa em 100 para arquivos do tipo Interação
        $("#tableInteracoes tr").each(function(){
            $(this).find('td:nth-child(2) a').each(function(index){
                contadorArquivos++;
                arquivo = $(this).attr('href');
                if(arquivo != undefined){
                    extensao = arquivo.substr(arquivo.lastIndexOf('.') + 1);
                    novoNome = contadorArquivos + ' - ' + protocolo + ' - ' + projeto + '.' + extensao;
                    arquivosParaDownload.push({
                        projeto: projeto,
                        protocolo: protocolo,
                        url: arquivo,
                        filename: novoNome
                    });
                }
            });
        });

        // adiciona o evento de clique ao botão
        $('.btnBaixarInteracoes').on('click', function(){
            chrome.runtime.sendMessage({arquivos: arquivosParaDownload});
        });
    }
}



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

