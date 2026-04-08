class BaseUser {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = 'user';
    }

    getPermissions() {
        return ['read_datasets'];
    }

    getDashboardDetails() {
        return {
            id: this.id,
            name: this.name,
            role: this.role
        };
    }
}

class AdminUser extends BaseUser {
    constructor(id, name, email) {
        super(id, name, email);  
        this.role = 'admin';
    }
    getPermissions() {
        return super.getPermissions().concat(['delete_users', 'manage_system']);
    }
}

class ResearcherUser extends BaseUser {
    constructor(id, name, email) {
        super(id, name, email);
        this.role = 'researcher';
    }
    getPermissions() {
        return super.getPermissions().concat(['upload_dataset', 'start_training_job']);
    }
}

module.exports = { BaseUser, AdminUser, ResearcherUser };