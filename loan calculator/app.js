// Listen for Submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
    // Hide Result
    document.getElementById('results').style.display = 'none';

    // Show Loader
    document.getElementById('loading').style.display = 'block';

    // set timeout
    setTimeout(calculateResults, 2000);


    e.preventDefault();
});


// Calculate Results
function calculateResults(e) {
    console.log('calculating...');

    // UI Variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');


    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat((interest.value)) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;


    // Compute Monthly Payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

        // Show results
        document.getElementById('results').style.display = 'block';

        // Hide loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('Please check your numbers');

        // Hide Loader
        document.getElementById('loading').style.display = 'none';
    }
}

// Show Error
function showError(error) {
    // Create a div
    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add a class
    errorDiv.className = 'alert alert-danger';

    // Create Text Node and Append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert Error Above Heading
    card.insertBefore(errorDiv, heading);

    // Make the error disappear after 3 seconds
    setTimeout(function() {
        errorDiv.style.display = 'none';
    }, 1000);

}

// Reset Values
document.querySelector('#reset').addEventListener('click', resetValues);

// Reset Values Function
function resetValues(e) {

    const amountValue = document.getElementById('amount');
    const interestValue = document.getElementById('interest');
    const yearsValue = document.getElementById('years');

    // reset the inputs to be empty
    amountValue.value = '';
    interestValue.value = '';
    yearsValue.value = '';

    // Hide Result
    document.getElementById('results').style.display = 'none';


    e.preventDefault();
}