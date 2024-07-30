document.addEventListener('DOMContentLoaded', () => {
    const factForm = document.getElementById('factForm');
    const factCategory = document.getElementById('factCategory');
    const factText = document.getElementById('factText');
    const factImage = document.getElementById('factImage');
    const hobbyFacts = document.getElementById('hobbyFacts');
    const financeFacts = document.getElementById('financeFacts');

    // Load facts from local storage
    const savedFacts = JSON.parse(localStorage.getItem('facts')) || [];
    savedFacts.forEach(fact => displayFact(fact));

    factForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const category = factCategory.value;
        const text = factText.value;
        let imageUrl = '';

        if (factImage.files && factImage.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageUrl = e.target.result;
                const newFact = { category, text, imageUrl };
                savedFacts.push(newFact);
                localStorage.setItem('facts', JSON.stringify(savedFacts));
                displayFact(newFact);
            };
            reader.readAsDataURL(factImage.files[0]);
        } else {
            const newFact = { category, text, imageUrl };
            savedFacts.push(newFact);
            localStorage.setItem('facts', JSON.stringify(savedFacts));
            displayFact(newFact);
        }

        // Clear the form
        factForm.reset();
    });

    function displayFact(fact) {
        const factElement = document.createElement('div');
        factElement.classList.add('fact-item');

        const factContent = document.createElement('div');
        factContent.textContent = fact.text;

        if (fact.imageUrl) {
            const factImageElement = document.createElement('img');
            factImageElement.src = fact.imageUrl;
            factContent.appendChild(factImageElement);
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            removeFact(fact);
            factElement.remove();
        });

        factElement.appendChild(factContent);
        factElement.appendChild(deleteButton);

        if (fact.category === 'hobby') {
            hobbyFacts.appendChild(factElement);
        } else if (fact.category === 'finance') {
            financeFacts.appendChild(factElement);
        }
    }

    function removeFact(factToRemove) {
        const updatedFacts = savedFacts.filter(fact => fact !== factToRemove);
        localStorage.setItem('facts', JSON.stringify(updatedFacts));
    }
});
