// Array de dados de cidades e entregadores
const cidadesEEntregadores = [
    { cidade: "Alfenas", entregador: "JOSÉ RAFAEL DE SOUSA ROCHA" },
    { cidade: "Alpinópolis", entregador: "RODRIGO DE PAULA ROCHA" },
    { cidade: "Alterosa", entregador: "WELINTON FERNANDO" },
    { cidade: "Areado", entregador: "ANAURI SABINO DE FIGUEIREDO" },
    { cidade: "Bom Jesus da Penha", entregador: "LIDIA DE SOUZA DINIZ" },
    { cidade: "CARMO DO RIO CLARO", entregador: "GUILHERME MORAIS MENESES" },
    { cidade: "Carvalhópolis", entregador: "JOSE DONIZETE DA COSTA" },
    { cidade: "Cassia", entregador: "ALEX SILVERIO" },
    { cidade: "Conceição da Aparecida", entregador: "HELDER WILSON" },
    { cidade: "Cordislândia", entregador: "ROGÉRIO GONÇALVES" },
    { cidade: "Divisa Nova", entregador: "LUCILE BERT APARECIDO DA SILVA" },
    { cidade: "Eloi Mendes", entregador: "FRANKINALDO GOMES DA SILVA" },
    { cidade: "Fama", entregador: "WANTUIL BARBOSA FONSECA NETTO" },
    { cidade: "Guaxupé", entregador: "EWERTON NAVARRO" },
    { cidade: "Itamogi", entregador: "FRANCISLENA VASCO MEDEIROS" },
    { cidade: "Itaú de Minas", entregador: "JAIME RODRIGUES DE MELO" },
    { cidade: "Jacuí", entregador: "DÉBORA FERREIRA (FABIULA)" },
    { cidade: "Monsenhor Paulo", entregador: "ROGÉRIO GONÇALVES" },
    { cidade: "Monte Belo", entregador: "GUILHERME THEODORO" },
    { cidade: "Monte Santo de Minas", entregador: "LAWRENCE MOREIRA LOBO" },
    { cidade: "Nova Resende", entregador: "ROSANA OLIVEIRA DIAS" },
    { cidade: "Paraguaçu", entregador: "ANDRE DOS SANTOS XAVIER" },
    { cidade: "Passos", entregador: "JOSINO SILVA NETO" },
    { cidade: "Poço Fundo", entregador: "ROGÉRIO GONÇALVES" },
    { cidade: "Pouso Alegre", entregador: "Não especificado na foto" },
    { cidade: "Santa Rita do Sapucaí", entregador: "Não especificado na foto" },
    { cidade: "São João Batista da Gloria", entregador: "NAYARA PACHECO SILVA" },
    { cidade: "São João da Mata", entregador: "ROGÉRIO GONÇALVES" },
    { cidade: "São José da Barra", entregador: "MARIANE JUSTINIANO LEMOS ALCANTRA" },
    { cidade: "São Pedro da União", entregador: "CLAYTON MARQUES" },
    { cidade: "São Sebastião do Paraíso", entregador: "LARISSA, KETLYN, LUCAS ROGER" },
    { cidade: "Serrania", entregador: "CARLOS HENRIQUE VIEIRA" },
    { cidade: "Turvolândia", entregador: "ROGÉRIO GONÇALVES" }
];

let selectedLayout = '2-por-pagina';

/**
 * @description Função para alternar a visibilidade entre as telas de entrada e visualização.
 * @param {string} viewName - O nome da tela a ser exibida ('input' ou 'preview').
 */
function toggleView(viewName) {
    const inputContainer = document.getElementById('input-container');
    const previewContainer = document.getElementById('preview-container');

    if (viewName === 'input') {
        inputContainer.classList.remove('hidden');
        previewContainer.classList.add('hidden');
    } else if (viewName === 'preview') {
        inputContainer.classList.add('hidden');
        previewContainer.classList.remove('hidden');
    }
}

/**
 * @description Função para preencher e ordenar as cidades no select.
 */
function preencherCidadesEOrdenar() {
    cidadesEEntregadores.sort((a, b) => a.cidade.localeCompare(b.cidade));
    const cidadeSelect = document.getElementById('cidade');
    cidadeSelect.innerHTML = '';
    cidadesEEntregadores.forEach(item => {
        const option = document.createElement('option');
        option.value = item.cidade;
        option.textContent = item.cidade;
        cidadeSelect.appendChild(option);
    });
}

/**
 * @description Função para atualizar o entregador com base na cidade selecionada.
 */
function atualizarEntregador() {
    const cidadeSelecionada = document.getElementById('cidade').value;
    const entregadorInput = document.getElementById('entregador');
    const entregador = cidadesEEntregadores.find(item => item.cidade === cidadeSelecionada)?.entregador || "Não encontrado";
    entregadorInput.value = entregador;
}

/**
 * @description Gera o HTML para uma única etiqueta.
 * @param {string} cidade - Nome da cidade.
 * @param {string} empresa - Nome da empresa.
 * @param {number} sacos - Quantidade de sacos.
 * @param {number} avulsos - Quantidade de mercadorias avulsas.
 * @param {number} totalItens - Total de itens.
 * @param {string} date - Data formatada.
 * @param {string} entregador - Nome do entregador.
 * @param {boolean} exibirMotorista - Se o nome do motorista deve ser exibido.
 * @param {number} count - Número do saco atual (ou null para a etiqueta master).
 */
function createLabelHtml(cidade, empresa, sacos, avulsos, totalItens, date, entregador, exibirMotorista, count = null) {
    const itensEmSacos = totalItens - avulsos;
    
    const sacoLabel = (count !== null) 
        ? `<div class="text-3xl font-bold">SACO: <span class="ml-1">${count}/${sacos}</span></div>`
        : '';

    const motoristaSection = exibirMotorista
        ? `<div class="mt-auto pt-2 text-center">
            <div class="text-xl text-gray-500 font-bold">MOTORISTA</div>
            <div class="text-center font-bold text-2xl">${entregador}</div>
            </div>`
        : '';

    const empresaLogo = (empresa === 'GFL')
        ? `<div class="flex items-center justify-center text-7xl font-bold gap-4 text-black logo-print-size">
                <i class="fa-solid fa-truck-fast caminhao-animado"></i>
                <span>GFL</span>
            </div>`
        : `<div class="text-7xl font-bold text-center text-black logo-print-size">${empresa}</div>`;

    return `
        <div class="etiqueta-print">
            <div class="text-center">
                ${empresaLogo}
                <div class="my-2 border-b-2 border-gray-400"></div>
                <div class="text-5xl font-bold text-black">${cidade}</div>
            </div>
            <div class="border-t border-gray-300 pt-2 flex-grow flex flex-col items-center">
                ${sacoLabel}
                <div class="flex flex-col items-center text-2xl mt-3 space-y-1">
                    <div><span class="font-bold">TOTAL SACOS:</span><span class="ml-1">${sacos}</span></div>
                    <div><span class="font-bold">ITENS EM SACOS:</span><span class="ml-1">${itensEmSacos}</span></div>
                    <div><span class="font-bold">AVULSOS:</span><span class="ml-1">${avulsos}</span></div>
                    <div class="my-2 border-b-2 border-gray-400 w-full"></div>
                    <div><span class="font-bold text-3xl">TOTAL GERAL:</span><span class="ml-1 text-3xl">${totalItens}</span></div>
                </div>
            </div>
            <div class="text-center mt-auto">
                ${motoristaSection}
                <div class="text-2xl text-gray-500 mt-2">${date}</div>
            </div>
        </div>
    `;
}

/**
 * @description Manipula o clique nos botões de aumento/diminuição de quantidade.
 * @param {Event} event - O evento de clique.
 */
function handleQuantityButtonClick(event) {
    const button = event.target.closest('.quantity-btn');
    if (!button) return;

    const action = button.dataset.action;
    const targetId = button.dataset.target;
    const input = document.getElementById(targetId);
    
    let value = parseInt(input.value) || 0;

    if (action === 'increase') {
        value = Math.min(value + 1, 1000);
    } else if (action === 'decrease') {
        value = Math.max(value - 1, 0);
    }
    input.value = value;
}

/**
 * @description Valida o input para garantir que é um número e está dentro dos limites.
 * @param {Event} event - O evento de input.
 */
function handleInput(event) {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value < 0) {
        event.target.value = 0;
    } else if (value > 1000) {
        event.target.value = 1000;
    }
}

/**
 * @description Exibe uma mensagem de feedback não-bloqueante na tela.
 * @param {string} message - A mensagem de erro a ser exibida.
 */
function showFeedbackMessage(message, type = 'error') {
    const feedbackDiv = document.getElementById('feedback-message');
    feedbackDiv.textContent = message;
    feedbackDiv.classList.remove('hidden', 'bg-red-500', 'bg-green-500');
    feedbackDiv.classList.add(type === 'error' ? 'bg-red-500' : 'bg-green-500');
    
    setTimeout(() => {
        feedbackDiv.classList.add('hidden');
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    preencherCidadesEOrdenar();
    atualizarEntregador();
    updateSelectedLayoutDisplay();
    toggleView('input');

    document.getElementById('cidade').addEventListener('change', atualizarEntregador);

    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', handleQuantityButtonClick);
    });
    document.getElementById('sacos').addEventListener('input', handleInput);
    document.getElementById('avulsos').addEventListener('input', handleInput);
    document.getElementById('totalItens').addEventListener('input', handleInput);
});

function updateSelectedLayoutDisplay() {
    const displaySpan = document.getElementById('selected-layout-display');
    if (selectedLayout === '4-por-pagina') {
        displaySpan.textContent = "4 por folha";
    } else {
        displaySpan.textContent = "2 por folha";
    }
}

document.getElementById('open-layout-modal-btn').addEventListener('click', () => {
    const radioBtn = document.querySelector(`input[name="modal-layout-select"][value="${selectedLayout}"]`);
    if (radioBtn) {
        radioBtn.checked = true;
    }
    document.getElementById('layout-preview-modal').style.display = 'flex';
});

document.getElementById('gerar-etiquetas-btn').addEventListener('click', () => {
    const sacos = parseInt(document.getElementById('sacos').value) || 0;
    const avulsos = parseInt(document.getElementById('avulsos').value) || 0;
    const totalItens = parseInt(document.getElementById('totalItens').value) || 0;

    if (sacos < 1) {
        showFeedbackMessage("A quantidade de sacos deve ser no mínimo 1.");
        return;
    }
    if (totalItens < 1) {
        showFeedbackMessage("O total de itens deve ser no mínimo 1.");
        return;
    }
    if (totalItens < avulsos) {
        showFeedbackMessage("O total de itens não pode ser menor que o número de mercadorias avulsas.");
        return;
    }
    
    const labelsCount = sacos + 1;
    const labelsPerPage = selectedLayout === '2-por-pagina' ? 2 : 4;
    const pagesCount = Math.ceil(labelsCount / labelsPerPage);

    document.getElementById('pages-count').textContent = pagesCount;
    document.getElementById('confirmation-modal').style.display = 'flex';
});

document.getElementById('confirm-generation-btn').addEventListener('click', () => {
    document.getElementById('confirmation-modal').style.display = 'none';
    generateLabelsAndShowPreview();
});

function generateLabelsAndShowPreview() {
    toggleView('preview');

    const printArea = document.getElementById('print-area');
    printArea.innerHTML = '';
    
    const sacos = parseInt(document.getElementById('sacos').value) || 0;
    const avulsos = parseInt(document.getElementById('avulsos').value) || 0;
    const totalItens = parseInt(document.getElementById('totalItens').value) || 0;
    const cidade = document.getElementById('cidade').value;
    const empresa = "GFL";
    const exibirMotorista = document.getElementById('exibirMotorista').checked;
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear()).slice(-2)}`;
    const entregador = document.getElementById('entregador').value;

    let labelsArray = [];
    labelsArray.push(createLabelHtml(cidade, empresa, sacos, avulsos, totalItens, formattedDate, entregador, exibirMotorista));
    
    for (let i = 1; i <= sacos; i++) {
        labelsArray.push(createLabelHtml(cidade, empresa, sacos, avulsos, totalItens, formattedDate, entregador, false, i));
    }

    let pagesHtml = [];
    if (selectedLayout === '2-por-pagina') {
        for (let i = 0; i < labelsArray.length; i += 2) {
            const pageLabels = labelsArray.slice(i, i + 2);
            const pageContent = pageLabels.join('');
            pagesHtml.push(`<div class="label-page-preview preview-layout-2-labels">${pageContent}</div>`);
        }
    } else {
        for (let i = 0; i < labelsArray.length; i += 4) {
            const pageLabels = labelsArray.slice(i, i + 4);
            const pageContent = pageLabels.join('');
            pagesHtml.push(`<div class="label-page-preview preview-layout-4-labels">${pageContent}</div>`);
        }
    }
    
    printArea.innerHTML = pagesHtml.join('');
}

document.getElementById('cancel-generation-btn').addEventListener('click', () => {
    document.getElementById('confirmation-modal').style.display = 'none';
});
document.getElementById('confirm-layout-btn').addEventListener('click', () => {
    const newLayout = document.querySelector('input[name="modal-layout-select"]:checked').value;
    selectedLayout = newLayout;
    updateSelectedLayoutDisplay();
    document.getElementById('layout-preview-modal').style.display = 'none';
});
document.getElementById('cancel-layout-btn').addEventListener('click', () => {
    document.getElementById('layout-preview-modal').style.display = 'none';
});

document.getElementById('imprimir-btn').addEventListener('click', () => {
    const sacos = parseInt(document.getElementById('sacos').value) || 0;
    const avulsos = parseInt(document.getElementById('avulsos').value) || 0;
    const totalItens = parseInt(document.getElementById('totalItens').value) || 0;
    const cidade = document.getElementById('cidade').value;
    const empresa = "GFL";
    const exibirMotorista = document.getElementById('exibirMotorista').checked;
    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear()).slice(-2)}`;
    const entregador = document.getElementById('entregador').value;

    let labelsArray = [];
    labelsArray.push(createLabelHtml(cidade, empresa, sacos, avulsos, totalItens, formattedDate, entregador, exibirMotorista));
    
    for (let i = 1; i <= sacos; i++) {
        labelsArray.push(createLabelHtml(cidade, empresa, sacos, avulsos, totalItens, formattedDate, entregador, false, i));
    }
    
    const printContent = generatePrintableHtml(labelsArray);
    printIframe(printContent);
});

function generatePrintableHtml(labels) {
    let pagesHtml = '';
    const labelsPerPage = selectedLayout === '2-por-pagina' ? 2 : 4;
    const pageClass = selectedLayout === '2-por-pagina' ? 'layout-2-labels' : 'layout-4-labels';

    for (let i = 0; i < labels.length; i += labelsPerPage) {
        const pageLabels = labels.slice(i, i + labelsPerPage).join('');
        pagesHtml += `
            <div class="label-page ${pageClass}">
                ${pageLabels}
            </div>
        `;
    }

    const printStyles = `
        @page {
            size: A4;
            margin: 0;
        }
        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
        }
        .label-page {
            width: 210mm;
            height: 297mm;
            margin: 0;
            box-sizing: border-box;
            position: relative;
            break-after: always;
        }
        .etiqueta-print {
            box-shadow: none;
            border: 1px solid #000;
            transform: none;
            padding: 10px;
            box-sizing: border-box;
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: #fff;
            border-radius: 0;
        }
        .etiqueta-print .text-center { text-align: center; }
        .etiqueta-print .text-5xl { font-size: 3rem; line-height: 1; }
        .etiqueta-print .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
        .etiqueta-print .text-2xl { font-size: 1.5rem; line-height: 2rem; }
        .etiqueta-print .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
        .etiqueta-print .font-bold { font-weight: 700; }
        .etiqueta-print .font-normal { font-weight: 400; }
        .etiqueta-print .text-black { color: #000; }
        .etiqueta-print .text-gray-500 { color: #6b7280; }
        .etiqueta-print .border-b-2 { border-bottom-width: 2px; }
        .etiqueta-print .border-gray-400 { border-color: #9ca3af; }
        .etiqueta-print .border-t { border-top-width: 1px; }
        .etiqueta-print .border-gray-300 { border-color: #d1d5db; }
        .etiqueta-print .pt-2 { padding-top: 0.5rem; }
        .etiqueta-print .mt-auto { margin-top: auto; }
        .etiqueta-print .mt-3 { margin-top: 0.75rem; }
        .etiqueta-print .mt-2 { margin-top: 0.5rem; }
        .etiqueta-print .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
        .etiqueta-print .ml-1 { margin-left: 0.25rem; }
        .etiqueta-print .flex { display: flex; }
        .etiqueta-print .flex-col { flex-direction: column; }
        .etiqueta-print .items-center { align-items: center; }
        .etiqueta-print .justify-center { justify-content: center; }
        .etiqueta-print .space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.25rem; }
        .etiqueta-print .w-full { width: 100%; }
        
        .etiqueta-print .logo-print-size {
            font-size: 4rem;
        }
        .etiqueta-print .logo-print-size .fa-solid {
            font-size: 4rem;
        }

        .layout-2-labels .etiqueta-print {
            width: 195mm;
            height: 141mm;
        }
        .layout-2-labels .etiqueta-print:nth-child(1) { top: 5mm; left: 7.5mm; }
        .layout-2-labels .etiqueta-print:nth-child(2) { top: 151mm; left: 7.5mm; }

        .layout-4-labels .etiqueta-print {
            width: 97.5mm;
            height: 138.5mm;
        }
        .layout-4-labels .etiqueta-print:nth-child(1) { top: 5mm; left: 5mm; }
        .layout-4-labels .etiqueta-print:nth-child(2) { top: 5mm; left: 107.5mm; }
        .layout-4-labels .etiqueta-print:nth-child(3) { top: 148.5mm; left: 5mm; }
        .layout-4-labels .etiqueta-print:nth-child(4) { top: 148.5mm; left: 107.5mm; }
    `;

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Impressão de Etiquetas</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" xintegrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <style>${printStyles}</style>
        </head>
        <body>
            ${pagesHtml}
        </body>
        </html>
    `;
}

function printIframe(content) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(content);
    doc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    setTimeout(() => {
        document.body.removeChild(iframe);
    }, 1000);
}

document.getElementById('layout-4-preview').addEventListener('click', () => {
    document.querySelector('input[name="modal-layout-select"][value="4-por-pagina"]').checked = true;
});
document.getElementById('layout-2-preview').addEventListener('click', () => {
    document.querySelector('input[name="modal-layout-select"][value="2-por-pagina"]').checked = true;
});

document.getElementById('voltar-btn').addEventListener('click', () => {
    toggleView('input');
});

// Adiciona funcionalidade para a navegação lateral
const sidebar = document.getElementById('sidebar');
const menuToggleBtn = document.getElementById('menu-toggle');
const closeMenuBtn = document.getElementById('close-menu-btn');

menuToggleBtn.addEventListener('click', () => {
    sidebar.classList.remove('sidebar-collapsed');
    sidebar.classList.add('sidebar-expanded');
});

closeMenuBtn.addEventListener('click', () => {
    sidebar.classList.remove('sidebar-expanded');
    sidebar.classList.add('sidebar-collapsed');
});