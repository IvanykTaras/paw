import { Project } from "../models/Project";


export class ProjectAPI {
    private static storageKey = 'projects';
    private static currentProjectKey = 'currentProject';

    /**
     * Create a new project and save it to localStorage.
     * @param project - The project to be created.
     */
    static create(project: Project): void {
        const projects = this.getAll();
        projects.push(project);
        this.saveProjects(projects);
    }

    /**
     * Retrieve all projects from localStorage.
     * @returns An array of Project objects.
     */
    static getAll(): Project[] {
        const projectsJson = localStorage.getItem(this.storageKey);
        if (!projectsJson) {
            return [];
        }
        return JSON.parse(projectsJson);
    }

    /**
     * Retrieve a project by its ID.
     * @param id - The ID of the project to retrieve.
     * @returns The Project object with the specified ID, or null if not found.
     */
    static getById(id: number): Project | null {
        const projects = this.getAll();
        return projects.find(project => project.id === id) || null;
    }

    /**
     * Update an existing project.
     * @param updatedProject - The project with updated information.
     */
    static update(updatedProject: Project): void {
        const projects = this.getAll();
        const projectIndex = projects.findIndex(project => project.id === updatedProject.id);
        if (projectIndex !== -1) {
            projects[projectIndex] = updatedProject;
            this.saveProjects(projects);

            // If the updated project is the current project, update it in localStorage
            const currentProject = this.getCurrentProject();
            if (currentProject && currentProject.id === updatedProject.id) {
                this.setCurrentProject(updatedProject);
            }
        }
    }

    /**
     * Delete a project by its ID.
     * @param id - The ID of the project to delete.
     */
    static delete(id: number): void {
        const projects = this.getAll();
        const updatedProjects = projects.filter(project => project.id !== id);
        this.saveProjects(updatedProjects);

        // If the deleted project is the current project, remove it from localStorage
        const currentProject = this.getCurrentProject();
        if (currentProject && currentProject.id === id) {
            localStorage.removeItem(this.currentProjectKey);
        }
    }

    /**
     * Save the list of projects to localStorage.
     * @param projects - The array of Project objects to be saved.
     */
    private static saveProjects(projects: Project[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(projects));
    }

    /**
     * Set a project as the current project in localStorage.
     * @param project - The project to be set as current.
     */
    static setCurrentProject(project: Project): void {
        localStorage.setItem(this.currentProjectKey, JSON.stringify(project));
    }

    /**
     * Retrieve the current project from localStorage.
     * @returns The current Project object, or null if no current project is set.
     */
    static getCurrentProject(): Project | null {
        const projectJson = localStorage.getItem(this.currentProjectKey);
        if (!projectJson) {
            return null;
        }
        return JSON.parse(projectJson);
    }

    /**
     * Clear the current project from localStorage.
     */
    static clearCurrentProject(): void {
        localStorage.removeItem(this.currentProjectKey);
    }
}