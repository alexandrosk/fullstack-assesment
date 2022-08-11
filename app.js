// Add script to render your frontend here

async function getPeople() {
    const response = await fetch('http://localhost:4000/people');
    const data = await response.json();
    
    const rows = data.people.map(people => {
        return `<li>
            <div class="card">
              <div class="card-content">
                <div class="content flex">
                    <div class="name">${people.name}</div>
                  <div class="id">id: ${people.id}</div>
                  <div class="age">age: ${people.age}</div>
                  <div class="email">email: ${people.email}</div>
                </div>
              </div>
            </div>
          </li>`;
      });
      const html = `<ul>${rows.join()}</ul>`;
      document.getElementById('people-list').innerHTML = html;
}

async function getPets() {
    document.getElementById("dog-sound").play();

    const response = await fetch('http://localhost:4000/pets');
    const data = await response.json();
    
    const rows = data.pets.map(pet => {
        
        return `<li>
            <div class="card">
              <div class="card-content">
                <div class="content flex">
                  <div class="name">name:${pet.name}</div>
                  <div class="id">id:${pet.id}</div>
                  <div class="age">age:${pet.age}</div>
                  <div class="species">species:${pet.species??''}</div>
                  <div class="person_id">person: ${pet.person_id}</div>
                </div>
              </div>
            </div>
          </li>`;
      });
      const html = `<ul>${rows.join()}</ul>`;
      document.getElementById('pet-list').innerHTML = html;
}
