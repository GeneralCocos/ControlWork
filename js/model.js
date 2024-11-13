// model.js
export class HabitModel {
    constructor() {
        this.habits = [];
    }

    addHabit(name, description, status) {
        const newHabit = { id: Date.now(), name, description, status };
        this.habits.push(newHabit);
        return newHabit;
    }

    deleteHabit(id) {
        this.habits = this.habits.filter(habit => habit.id !== id);
    }

    updateHabit(id, updatedData) {
        const habit = this.habits.find(habit => habit.id === id);
        if (habit) Object.assign(habit, updatedData);
    }

    toggleHabitStatus(id) {
        const habit = this.habits.find(habit => habit.id === id);
        if (habit) {
            habit.status = habit.status === 'active' ? 'completed' : 'active';
        }
    }

    filterHabits(status) {
        return status === 'all' ? this.habits : this.habits.filter(habit => habit.status === status);
    }
}
