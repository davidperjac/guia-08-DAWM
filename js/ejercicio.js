const select = document.querySelector('select');

const cleanFrases = () => {
	const frases = document.getElementById('frases');

	while (frases.hasChildNodes()) {
		frases.removeChild(frases.firstChild);
	}
};

const getPlantillaFrases = (frase) => {
	return `
      <div class="col-lg-3">
        <div class="test-inner ">
          <div class="test-author-thumb d-flex">
            <div class="test-author-info">
                <h4>${frase.id_autor}</h4>
            </div>
          </div>
        <span>${frase.texto}</span>
          <i class="fa fa-quote-right"></i>
        </div>
      </div>`;
};

const cargarDatos = () => {
	fetch('https://dataserverdaw.herokuapp.com/escritores/xml')
		.then((response) => response.text())
		.then((data) => {
			const parser = new DOMParser();
			const xml = parser.parseFromString(data, 'application/xml');
			const escritores = xml.getElementsByTagName('escritor');

			for (let escritor of escritores) {
				const id = escritor.querySelector('id').textContent;
				const name = escritor.querySelector('nombre').textContent;

				const plantilla = `<option value="${id}">${name}</option>`;
				document.querySelector('select').innerHTML += plantilla;
			}
		})
		.catch(console.error);
};

const changeSelect = () => {
	cleanFrases();
	fetch('https://dataserverdaw.herokuapp.com/escritores/frases')
		.then((response) => response.text())
		.then((data) => {
			const frases = JSON.parse(data).frases;
			const filterValue = document.querySelector('select').value;

			const filteredArray = frases.filter(
				(frase) => frase.id_autor == filterValue
			);

			for (let frase of filteredArray) {
				const plantillaFrases = getPlantillaFrases(frase);
				document.getElementById('frases').innerHTML += plantillaFrases;
			}
		})
		.catch(console.error);
};

select.addEventListener('change', (event) => {
	changeSelect();
});

window.addEventListener('DOMContentLoaded', (event) => {
	cargarDatos();
});
