const projectLinkHandler = (event) => {
  if(event.target.classList.contains('project-link')) {
    console.log("this code is running")
    let projectId = event.target.getAttribute('data-id');
    localStorage.setItem('projectID', "projectId");
    localStorage.setItem('projectID', projectId);
  }
};


const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const description = document.querySelector('#project-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  console.log("deleting project")
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.btn-danger')
  .addEventListener('click', delButtonHandler);

  document
  .querySelector('.project-list')
  .addEventListener('click', projectLinkHandler);