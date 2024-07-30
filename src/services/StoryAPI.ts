// src/services/StoryAPI.ts
import { Story } from '../models/Story';

export class StoryAPI {
    private static storageKey = 'stories';

    /**
     * Create a new story and save it to localStorage.
     * @param story - The story to be created.
     */
    static create(story: Story): void {
        const stories = this.getAll();
        stories.push(story);
        this.saveStories(stories);
    }

    /**
     * Retrieve all stories from localStorage.
     * @returns An array of Story objects.
     */
    static getAll(): Story[] {
        const storiesJson = localStorage.getItem(this.storageKey);
        if (!storiesJson) {
            return [];
        }
        return JSON.parse(storiesJson);
    }

    /**
     * Retrieve a story by its ID.
     * @param id - The ID of the story to retrieve.
     * @returns The Story object with the specified ID, or null if not found.
     */
    static getById(id: number): Story | null {
        const stories = this.getAll();
        return stories.find(story => story.id === id) || null;
    }

    /**
     * Update an existing story.
     * @param updatedStory - The story with updated information.
     */
    static update(updatedStory: Story): void {
        const stories = this.getAll();
        const storyIndex = stories.findIndex(story => story.id === updatedStory.id);
        if (storyIndex !== -1) {
            stories[storyIndex] = updatedStory;
            this.saveStories(stories);
        }
    }

    /**
     * Delete a story by its ID.
     * @param id - The ID of the story to delete.
     */
    static delete(id: number): void {
        const stories = this.getAll();
        const updatedStories = stories.filter(story => story.id !== id);
        this.saveStories(updatedStories);
    }

    /**
     * Save the list of stories to localStorage.
     * @param stories - The array of Story objects to be saved.
     */
    private static saveStories(stories: Story[]): void {
        localStorage.setItem(this.storageKey, JSON.stringify(stories));
    }
}
