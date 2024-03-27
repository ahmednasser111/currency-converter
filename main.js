document.addEventListener('DOMContentLoaded', function() {

	let amount = document.getElementById('amount')
	let send = document.querySelector('input[type=submit]')

	let from = document.getElementById('from')
	let to = document.getElementById('to')
	let result = document.querySelector('.result')

	fetch('https://api.currencyfreaks.com/v2.0/rates/latest?apikey=45817a75212f4af08ad9688f478147c0').then(response => {
		return response.json();
	}).then(data => {
		console.log(data)
		Object.keys(data.rates).forEach(item => {
			let option = document.createElement('option');
			option.textContent = item;
			option.value = item;
			from.appendChild(option);
			to.appendChild(option.cloneNode(true));
		})
	


		send.addEventListener('click', () =>{
			if (amount.value === '') {
				result.textContent = 'Please enter an amount.';
				return;
			}
			let convertedAmount = data.rates[to.value] / data.rates[from.value] * amount.value;
			result.textContent = `Converted amount: ${convertedAmount.toFixed(2)} ${to.value}`;
		})
	}).catch(error => {
            result.textContent = 'Error fetching currency rates. Please try again later.';
            console.error('Error fetching currency rates:', error);
      });
})