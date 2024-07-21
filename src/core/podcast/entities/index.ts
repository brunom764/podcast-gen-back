export class Podcast {
    id: string;
    title: string;
    category: string;
    period: string;
    audioUrl?: string;
    summary?: string;

    constructor(id: string, category: string, title: string, period: string, audioUrl?: string, summary?: string) {
        this.id = id;
        this.title = title;
        this.category = category;
        this.period = period;
        this.audioUrl = audioUrl;
        this.summary = summary;
    }

    addAudioUrl(audioUrl: string) {
        this.audioUrl = audioUrl;
    }

    addSummary(summary: string) {
        this.summary = summary;
    }

}