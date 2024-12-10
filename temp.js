
// <script>
//     const searchForm = document.getElementById('home_btn');

//     searchForm.addEventListener('home_btn', async function (e) {
//         e.preventDefault();

//     const query = document.getElementById('user_inpu').value;

//     resultsDiv.style.display = 'none';
//     resultsList.innerHTML = '';

//     try {
//             const response = await fetch(`http://localhost:7000/api/search?q=${encodeURIComponent(query)}`, {
//         method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//                 }
//             });

//     if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }

//     const result = await response.json();

//             if (result && result.results && result.results.length > 0) {
//         //analyze the result data from api...
//     } else {
//         alert('No results found.');
//             }
//         } catch (error) {
//         console.error('Error:', error);
//     alert(`Unable to fetch results: ${error.message}`);
//         }
//     });
