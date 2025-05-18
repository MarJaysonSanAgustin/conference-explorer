export interface ConferenceLocation {
  name: string;
  city: string;
  address: string;
  country: {
    name: string;
    code: string;
  };
  image: {
    title?: string;
    url?: string;
  };
}
export interface Conference {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  year: string;
  slogan?: string;
  imageUrl?: string;
  locations: ConferenceLocation[];
  organizer: {
    name: string;
  };
  series: {
    name: string;
  };
  websiteUrl: string;
}

export interface FetchConferenceResponse {
  conferences: Conference[];
}

export interface FetchConferenceByIdResponse {
  conference: Conference;
}
