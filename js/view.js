// view.js
export class HabitView {
    constructor() {
        this.app = document.getElementById('app');
        this.createLayout();
    }

    createLayout() {
        this.app.innerHTML = `
            <div class="container">
                <h1>Ежедневный Трекер Привычек</h1>
                <details>
                    <summary>Как использовать</summary>
                    <p>Добавляйте привычки, следите за их выполнением и обновляйте статус.</p>
                </details>
                <div class="habit-form" id="habit-form-section"></div>
                <div class="habit-filter" id="habit-filter-section"></div>
                <div class="habit-list" id="habit-list-section"></div>
                <div class="habit-edit-form" id="habit-edit-section" style="display: none;"></div>
            </div>
        `;
    }

    renderForm(handleAddHabit) {
        const formSection = document.getElementById('habit-form-section');
        formSection.innerHTML = `
            <h2>Добавить Привычку</h2>
            <form id="habit-form">
                <label for="habit-name">Название привычки:</label>
                <input type="text" id="habit-name" required />
                
                <label for="habit-description">Описание:</label>
                <textarea id="habit-description" rows="3"></textarea>

                <label for="habit-status">Статус привычки:</label>
                <select id="habit-status" required>
                    <option value="active">Активна</option>
                    <option value="completed">Завершена</option>
                </select>

                <button type="submit">Добавить Привычку</button>
            </form>
        `;

        const form = document.getElementById('habit-form');
        form.addEventListener('submit', event => {
            event.preventDefault();
            const name = form.querySelector('#habit-name').value;
            const description = form.querySelector('#habit-description').value;
            const status = form.querySelector('#habit-status').value;
            handleAddHabit(name, description, status);
            form.reset();
        });
    }

    renderFilter(handleFilterChange) {
        const filterSection = document.getElementById('habit-filter-section');
        filterSection.innerHTML = `
            <h2>Фильтры</h2>
            <label for="status-filter">Фильтр по статусу:</label>
            <select id="status-filter">
                <option value="all">Все</option>
                <option value="active">Активные</option>
                <option value="completed">Завершенные</option>
            </select>
        `;

        const filter = document.getElementById('status-filter');
        filter.addEventListener('change', () => handleFilterChange(filter.value));
    }

    renderHabitList(habits, handleDeleteHabit, handleEditHabit, handleToggleStatus) {
        const listSection = document.getElementById('habit-list-section');
        listSection.innerHTML = `
            <h2>Список Привычек</h2>
            <div id="habit-list">
                ${habits.map(habit => `
                    <div class="habit-item" data-id="${habit.id}">
                        <h3>${habit.name}</h3>
                        <p>${habit.description || "Нет описания"}</p>
                        <span>${habit.status === 'active' ? 'Активна' : 'Завершена'}</span>
                        <button class="toggle-status">Переключить статус</button>
                        <button class="edit-habit">Редактировать</button>
                        <button class="delete-habit">Удалить</button>
                    </div>
                `).join('')}
            </div>
        `;

        listSection.querySelectorAll('.delete-habit').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.closest('.habit-item').dataset.id;
                handleDeleteHabit(Number(id));
            });
        });

        listSection.querySelectorAll('.edit-habit').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.closest('.habit-item').dataset.id;
                handleEditHabit(Number(id));
            });
        });

        listSection.querySelectorAll('.toggle-status').forEach(button => {
            button.addEventListener('click', event => {
                const id = event.target.closest('.habit-item').dataset.id;
                handleToggleStatus(Number(id));
            });
        });
    }

    renderEditForm(habit, handleUpdateHabit) {
        const editSection = document.getElementById('habit-edit-section');
        editSection.style.display = 'block';
        editSection.innerHTML = `
            <h2>Редактировать Привычку</h2>
            <form id="habit-edit-form">
                <label for="edit-habit-name">Название привычки:</label>
                <input type="text" id="edit-habit-name" value="${habit.name}" required />
                
                <label for="edit-habit-description">Описание:</label>
                <textarea id="edit-habit-description" rows="3">${habit.description || ""}</textarea>

                <label for="edit-habit-status">Статус привычки:</label>
                <select id="edit-habit-status">
                    <option value="active" ${habit.status === 'active' ? 'selected' : ''}>Активна</option>
                    <option value="completed" ${habit.status === 'completed' ? 'selected' : ''}>Завершена</option>
                </select>

                <button type="submit">Сохранить изменения</button>
                <button type="button" id="cancel-edit">Отмена</button>
            </form>
        `;

        const form = document.getElementById('habit-edit-form');
        form.addEventListener('submit', event => {
            event.preventDefault();
            const updatedHabit = {
                name: form.querySelector('#edit-habit-name').value,
                description: form.querySelector('#edit-habit-description').value,
                status: form.querySelector('#edit-habit-status').value
            };
            handleUpdateHabit(habit.id, updatedHabit);
            editSection.style.display = 'none';
        });

        document.getElementById('cancel-edit').addEventListener('click', () => {
            editSection.style.display = 'none';
        });
    }
}
