import { HabitModel } from './model.js';
import { HabitView } from './view.js';

class HabitPresenter {
    constructor() {
        this.model = new HabitModel();
        this.view = new HabitView();

        this.view.renderForm(this.handleAddHabit.bind(this));
        this.view.renderFilter(this.handleFilterChange.bind(this));

        this.updateHabitList();
    }

    handleAddHabit(name, description, status) {
        this.model.addHabit(name, description, status);
        this.updateHabitList();
    }

    handleDeleteHabit(id) {
        this.model.deleteHabit(id);
        this.updateHabitList();
    }

    handleEditHabit(id) {
        const habit = this.model.habits.find(habit => habit.id === id);
        if (habit) {
            // Render the edit form with the current habit details
            this.view.renderEditForm(habit, this.handleUpdateHabit.bind(this));
        }
    }

    handleUpdateHabit(id, updatedData) {
        this.model.updateHabit(id, updatedData);
        this.updateHabitList();
    }

    handleToggleStatus(id) {
        this.model.toggleHabitStatus(id);
        this.updateHabitList();
    }

    handleFilterChange(status) {
        this.updateHabitList(status);
    }

    updateHabitList(filter = 'all') {
        const habits = this.model.filterHabits(filter);
        this.view.renderHabitList(habits, this.handleDeleteHabit.bind(this), this.handleEditHabit.bind(this), this.handleToggleStatus.bind(this));
    }
}

new HabitPresenter();
