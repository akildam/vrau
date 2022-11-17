chrome.runtime.onMessage.addListener((response) => {
    for (i = 0; i < response.arquivos.length; i++) {
        chrome.downloads.download({
            url: response.arquivos[i].url,
            filename: 'TAREFAS PORTAL/' + response.arquivos[i].filename
        });
    }
});