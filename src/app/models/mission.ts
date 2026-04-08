export interface Rocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

export interface Links {
  mission_patch: string;
  mission_patch_small: string;
  article_link: string;
  wikipedia: string;
  video_link: string;
}

export interface LaunchSite {
  site_id: string;
  site_name: string;
  site_name_long: string;
}

export interface Mission {
  flight_number: number;
  mission_name: string;
  mission_id: string[];
  launch_year: string;
  launch_date_utc: string;
  rocket: Rocket;
  details: string;
  launch_site: LaunchSite;
  links: Links;
  launch_success: boolean;
  land_success: boolean;
}
