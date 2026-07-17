// ---- État de l'application ----
  let tasks = [];
  let currentFilter = 'all';

  // ---- Éléments du DOM ----
  const taskInput = document.getElementById('taskInput');
  const addBtn = document.getElementById('addBtn');
  const taskList = document.getElementById('taskList');
  const taskCount = document.getElementById('taskCount');
  const clearCompletedBtn = document.getElementById('clearCompleted');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // ---- Ajouter une tâche ----
  function addTask() {
    const text = taskInput.value.trim();
    if (text === '') return;

    tasks.push({
      id: Date.now(),
      text: text,
      completed: false
    });

    taskInput.value = '';
    render();
  }

  // ---- Basculer l'état terminé/non terminé ----
  function toggleTask(id) {
    tasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    render();
  }

  // ---- Supprimer une tâche ----
  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    render();
  }

  // ---- Effacer les tâches terminées ----
  function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);
    render();
  }

  // ---- Filtrer les tâches selon le filtre actif ----
  function getFilteredTasks() {
    if (currentFilter === 'active') return tasks.filter(t => !t.completed);
    if (currentFilter === 'completed') return tasks.filter(t => t.completed);
    return tasks;
  }

  // ---- Afficher les tâches à l'écran ----
  function render() {
    const filtered = getFilteredTasks();
    taskList.innerHTML = '';

    if (filtered.length === 0) {
      taskList.innerHTML = '<p class="empty-msg">Aucune tâche à afficher</p>';
    } else {
      filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task' + (task.completed ? ' completed' : '');

        li.innerHTML = `
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
          <span class="task-text"></span>
          <button class="delete-btn">✕</button>
        `;

        // On insère le texte via textContent (évite les failles XSS)
        li.querySelector('.task-text').textContent = task.text;

        li.querySelector('input').addEventListener('change', () => toggleTask(task.id));
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

        taskList.appendChild(li);
      });
    }

    const remaining = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${remaining} tâche(s) restante(s)`;
  }

  // ---- Événements ----
  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });
  clearCompletedBtn.addEventListener('click', clearCompleted);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      render();
    });
  });

  // ---- Rendu initial ----
  render();
