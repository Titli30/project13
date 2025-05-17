function showBuilder() {
  document.getElementById('builder').classList.remove('hidden');
}

function addEducation() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Degree" />
    <input placeholder="Institution" />
    <input placeholder="Duration (e.g. Jan 2020 - Dec 2022)" />
    <input placeholder="Grade" />
  `;
  document.getElementById("education-container").appendChild(div);
}

function addCompany() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Position" />
    <input placeholder="Company" />
    <input placeholder="Duration" />
    <textarea placeholder="Details"></textarea>
  `;
  document.getElementById("company-container").appendChild(div);
}

function addProject() {
  const div = document.createElement("div");
  div.innerHTML = `
    <input placeholder="Project Title" />
    <input placeholder="Link" />
    <textarea placeholder="Description"></textarea>
  `;
  document.getElementById("project-container").appendChild(div);
}

function generateResume() {
  const imgFile = document.getElementById('photo').files[0];
  const reader = new FileReader();
  reader.onloadend = function () {
    const imgSrc = reader.result;
    const name = document.getElementById("name").value;
    const title = document.getElementById("title").value;
    const profile = document.getElementById("profile").value;
    const guardian = document.getElementById("guardian").value;
    const github = document.getElementById("github").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const skills = document.getElementById("skills").value.split(",");
    const languages = document.getElementById("languages").value.split(",");
    const hobbies = document.getElementById("hobbies").value.split(",");

    const educationItems = Array.from(document.getElementById("education-container").children).map(div => {
      const inputs = div.querySelectorAll("input");
      return `<p><strong>${inputs[0].value}</strong> (${inputs[2].value})<br>${inputs[1].value} – Grade: ${inputs[3].value}</p>`;
    });

    const companyItems = Array.from(document.getElementById("company-container").children).map(div => {
      const inputs = div.querySelectorAll("input, textarea");
      return `<p><strong>${inputs[0].value}</strong> (${inputs[2].value})<br>${inputs[1].value}<br>${inputs[3].value}</p>`;
    });

    const projectItems = Array.from(document.getElementById("project-container").children).map(div => {
      const inputs = div.querySelectorAll("input, textarea");
      return `<p><strong><a href="${inputs[1].value}" target="_blank">${inputs[0].value}</a></strong><br>${inputs[2].value}</p>`;
    });

    document.getElementById("resume-preview").innerHTML = `
      <div class="sidebar">
        <img src="${imgSrc}" />
        <h2>${name}</h2>
        <p>${title}</p>
        <h3>Contact Details</h3>
        <p>📞 ${phone}<br>📧 ${email}<br>📍 ${address}</p>
        <h3>Guardian</h3><p>${guardian}</p>
        <h3>GitHub</h3><p>${github}</p>
        <h3>Skills</h3><ul>${skills.map(s => `<li>${s.trim()}</li>`).join("")}</ul>
        <h3>Languages</h3><ul>${languages.map(l => `<li>${l.trim()}</li>`).join("")}</ul>
        <h3>Hobbies</h3><ul>${hobbies.map(h => `<li>${h.trim()}</li>`).join("")}</ul>
      </div>
      <div class="section">
        <h3>Profile</h3><p>${profile}</p>
        <h3>Work Experience</h3>${companyItems.join("")}
        <h3>Projects</h3>${projectItems.join("")}
        <h3>Education</h3>${educationItems.join("")}
      </div>
    `;
  };
  if (imgFile) reader.readAsDataURL(imgFile);
}

function downloadPDF() {
  window.print();
}
