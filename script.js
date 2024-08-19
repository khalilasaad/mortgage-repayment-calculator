const amount = document.getElementById('amount');
const term = document.getElementById('term');
const rate = document.getElementById('rate');
const repaymentRadio = document.getElementById('repayment');
const interstRadio = document.getElementById('interst');
const btn = document.getElementById('btn');
const result = document.querySelector('.res-container');
const types = document.querySelectorAll('.custom-radio');

let repayment = null;
console.log(repayment);

function getResult() {
	result.innerHTML = '';

	if (repayment === null) {
		result.innerHTML = `<h3>Please enter the mortgage type.</h3>`;
	} else {
		const mortgageAmount = parseFloat(amount.value);
		const mortgageTerm = parseInt(term.value) * 12;
		const interestRate = parseFloat(rate.value) / 1200;
		let typeResult;

		const monthlyRepayment =
			(mortgageAmount * interestRate) /
			(1 - Math.pow(1 + interestRate, -mortgageTerm));

		const monthlyInterstOnly = mortgageAmount * interestRate;

		const totalRepayment = monthlyRepayment * mortgageTerm;

		if (repayment) {
			typeResult = monthlyRepayment;
		} else {
			typeResult = monthlyInterstOnly;
		}

		const heading = document.createElement('h3');
		heading.innerText = 'Your results';

		const paragraph = document.createElement('p');
		paragraph.innerText = `Your results are shown below based on the information you
				provided. To adjust the results, edit the form and click “calculate
				repayments” again.`;

		const resultContainer = document.createElement('div');
		resultContainer.classList.add('result-container');

		const choosenResult = document.createElement('div');
		choosenResult.classList.add('res');

		const totalResult = document.createElement('div');
		totalResult.classList.add('res');

		const resOne = document.createElement('p');
		resOne.innerText = `Your monthly repayments`;

		const resOneValue = document.createElement('h1');
		resOneValue.innerText = `${typeResult.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			style: 'currency',
			currency: 'USD',
		})}`;

		const resTwo = document.createElement('p');
		resTwo.innerText = `Total you'll repay over the term`;

		const resTwoValue = document.createElement('h2');
		resTwoValue.innerText = `${totalRepayment.toLocaleString('en-US', {
			minimumFractionDigits: 2,
			style: 'currency',
			currency: 'USD',
		})}`;

		choosenResult.appendChild(resOne);
		choosenResult.appendChild(resOneValue);

		totalResult.appendChild(resTwo);
		totalResult.appendChild(resTwoValue);

		resultContainer.appendChild(choosenResult);
		resultContainer.appendChild(totalResult);

		result.appendChild(heading);
		result.appendChild(paragraph);
		result.appendChild(resultContainer);
	}
}

function updateType() {
	repayment = repaymentRadio.checked;
	if (repayment) {
		types[0].classList.add('checked');
		types[1].classList.remove('checked');
	} else {
		types[1].classList.add('checked');
		types[0].classList.remove('checked');
	}
}

repaymentRadio.addEventListener('change', updateType);
interstRadio.addEventListener('change', updateType);

amount.addEventListener('input', (event) => {
	const inputValue = event.target.value;
	if (inputValue === '' || /^\d+$/.test(inputValue)) {
		amount.value = inputValue;
	} else {
		event.target.value = inputValue.replace(/\D/g, '');
	}
});

term.addEventListener('input', (event) => {
	const inputValue = event.target.value;
	if (inputValue === '' || /^\d+$/.test(inputValue)) {
		term.value = inputValue;
	} else {
		event.target.value = inputValue.replace(/\D/g, '');
	}
});

rate.addEventListener('input', (event) => {
	const inputValue = event.target.value;
	if (inputValue === '' || /^\d*\.?\d{0,2}$/.test(inputValue)) {
		rate.value = inputValue;
	} else {
		event.target.value = inputValue
			.replace(/\D/g, '')
			.replace(/^(\d*\.?\d{0,2})\d+$/, '$1');
	}
});

btn.addEventListener('click', getResult);
