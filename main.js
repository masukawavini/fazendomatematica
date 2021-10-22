var tabuleiro = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0]
]

var tabuleiroCopia = [[], [], [], [], []];

var numeroPecas = 5;
var numeroQuadradosInfectados = 0;
var totalPerimetroContaminado = 0;

var botaoLimpar;
var botaoContaminar;

var mostrarTotalInfectados;

function setup() {
	createCanvas(500, 500);

	botaoLimpar = createButton('Limpar tabuleiro');
	botaoLimpar.position(265, 20);
	botaoLimpar.mousePressed(limparTabuleiro);

	botaoContaminar = createButton('Contaminar');
	botaoContaminar.position(265, 50);
	botaoContaminar.mousePressed(contaminar);

	mostrarTotalInfectados = createP('Total de infectados: '+numeroQuadradosInfectados);
	mostrarTotalInfectados.style('font-size', '16px');
	mostrarTotalInfectados.position(20, 260);

	PerimetroContaminacao = createP('Perimetro de contaminacao: '+totalPerimetroContaminado);
	PerimetroContaminacao.style('font-size', '16px');
	PerimetroContaminacao.position(20, 290);
}

function draw() {
	background(255, 255, 255);

	desenharQuadrado();
	updateTotalInfectados();
	updatePerimetro();
}

function mousePressed() {
	var linha = floor(mouseX/50);
	var coluna = floor(mouseY/50);

	if (mouseX >= 0 && mouseX <= 250 && mouseY >= 0 && mouseY <= 250) {
		if (tabuleiro[coluna][linha] == 0) {
			tabuleiro[coluna][linha] = 1;
		}
		else {
			tabuleiro[coluna][linha] = 0;
		}
	}
}

function desenharQuadrado() {
	for (var i = 0; i < numeroPecas; i++) {
		for (var j = 0; j < numeroPecas; j++) {
			if (tabuleiro[j][i] == 0) {
				fill(255, 255, 255);
			}
			else {
				fill(100);
			}
			square(i*50, j*50, 50);
		}
	}
}

function limparTabuleiro() {
	for (var i = 0; i < numeroPecas; i++) {
		for (var j = 0; j < numeroPecas; j++) {
			tabuleiro[j][i] = 0;
		}
	}
}

function copiarTabuleiro(l1, l2) {
	for (var i = 0; i < numeroPecas; i++) {
		for (var j = 0; j < numeroPecas; j++) {
			l1[j][i] = l2[j][i];
		}
	}
}

function transmitirVizinho() {
	copiarTabuleiro(tabuleiroCopia, tabuleiro);
	for (var i = 0; i < numeroPecas; i++) {
		for (var j = 0; j < numeroPecas; j++) {
			if (tabuleiro[j][i] == 1) {
				if (j > 0) 
					tabuleiroCopia[j-1][i] += 1;
				if (j < 4) 
					tabuleiroCopia[j+1][i] += 1;
				if (i > 0) 
					tabuleiroCopia[j][i-1] += 1;
				if (i < 4) 
					tabuleiroCopia[j][i+1] += 1;
			}
		}
	}
}

function infectarQuadrado() {
	for (var i = 0; i < numeroPecas; i++) {
		for (var j = 0; j < numeroPecas; j++) {
			if (tabuleiro[j][i] == 1)
				tabuleiroCopia[j][i] = 1;
			else if (tabuleiroCopia[j][i] >= 2)
				tabuleiroCopia[j][i] = 1;
			else 
				tabuleiroCopia[j][i] = 0;
		}
	}
	copiarTabuleiro(tabuleiro, tabuleiroCopia);
}

function contaminar() {
	transmitirVizinho();
	infectarQuadrado();
}

function quadradosInfectados() {
	numeroQuadradosInfectados = 0;
	for (var i = 0; i < numeroPecas; i++) {
		for (var j = 0; j < numeroPecas; j++) {
			if (tabuleiro[j][i] == 1) numeroQuadradosInfectados++;
		}
	}
	return numeroQuadradosInfectados;
}

function calcularPerimetro() {
	totalPerimetroContaminado = 0;
	for (var i = 0; i < numeroPecas; i++) {
		for (var j = 0; j < numeroPecas; j++) {
			if (tabuleiro[j][i] == 1) {
				var perimetro = 4;
				if (j > 0 && tabuleiro[j-1][i] == 1) perimetro--;
				if (j < 4 && tabuleiro[j+1][i] == 1) perimetro--;
				if (i > 0 && tabuleiro[j][i-1] == 1) perimetro--;
				if (i < 4 && tabuleiro[j][i+1] == 1) perimetro--;
				totalPerimetroContaminado += perimetro;
			}
		}
	}
	return totalPerimetroContaminado;	
}

function updateTotalInfectados() {
	mostrarTotalInfectados.html('Total de infectados: '+quadradosInfectados());
}

function updatePerimetro() {
	PerimetroContaminacao.html('Perimetro de contaminacao: '+calcularPerimetro());
}
