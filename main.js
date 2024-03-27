document.addEventListener('DOMContentLoaded', function() {

	let amount = document.getElementById('amount')
	let send = document.querySelector('input[type=submit]')

	let from = document.getElementById('from')
	let to = document.getElementById('to')
	let result = document.querySelector('.result')

	fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=45817a75212f4af08ad9688f478147c0').then(response => {
		return response.json();
	}).then(data => {
		let currencies = Object.keys(data.rates).sort();
		currencies.forEach(item => {
			let option = document.createElement('option');
			option.textContent = item;
			option.value = item;
			from.appendChild(option);
			to.appendChild(option.cloneNode(true));
		})
		from.querySelector('option[value="USD"]').selected = true;
		to.querySelector('option[value="EGP"]').selected = true;


		send.addEventListener('click', () =>{
			// Check if the amount input field is empty
			if (amount.value === '') {
				result.textContent = 'Please enter an amount.';
				return;
			}
			// Calculate the converted amount
			let convertedAmount = data.rates[to.value] / data.rates[from.value] * amount.value;
			result.textContent = `Converted amount: ${convertedAmount.toFixed(2)} ${to.value}`;
		})
	}).catch(error => {
		 // Handle errors in fetching currency rates	
            result.textContent = 'Error fetching currency rates. Please try again later.';
            console.error('Error fetching currency rates:', error);
      });
})