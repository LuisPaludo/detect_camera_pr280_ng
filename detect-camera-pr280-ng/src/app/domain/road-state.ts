export interface RoadState {
    id: number;
    road_state: string;
    confidence: number;
    created_at: string;
    updated_at: string;
    img_url: string;
    moving_avg_state: string;
    moving_avg_percentage: number;
    state_duration: number;
    formatted_duration: string;
    last_road_state: string;
    last_road_state_duration: number;
    formatted_last_duration: string;
}
