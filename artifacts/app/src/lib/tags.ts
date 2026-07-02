export interface Prefs {
  zip_code?: string | null;
  age_range?: string | null;
  gender?: string | null;
  ethnicity?: string | null;
  life_status?: string | null;
  occupation?: string | null;
  transportation_modes?: string[] | null;
  travel_range?: string | null;
  low_cost_priority?: boolean | null;
  access_preferences?: string[] | null;
  resource_interests?: string[] | null;
  personal_interests?: string[] | null;
  career_interests?: string[] | null;
  content_preference?: string | null;
  engagement_preference?: string | null;
}

export function generateTags(prefs: Prefs): string[] {
  const tags = new Set<string>();

  const ls = prefs.life_status ?? "";
  if (ls === "high_school_student" || ls === "college_student") tags.add("student");
  if (ls === "looking_for_work" || ls === "between_jobs") tags.add("job_seeker");
  if (ls === "self_employed") tags.add("entrepreneur");
  if (ls === "caregiver") tags.add("caregiver");
  if (ls === "retired") tags.add("retired");
  if (ls === "volunteer") tags.add("volunteer");
  if (ls === "employed_fulltime" || ls === "employed_parttime") tags.add("employed");

  const transit = prefs.transportation_modes ?? [];
  if (transit.includes("bus") || transit.includes("train")) tags.add("public_transit_user");
  if (transit.includes("walk")) tags.add("pedestrian");
  if (transit.includes("bike")) tags.add("cyclist");
  if (transit.includes("rides")) tags.add("rideshare_dependent");

  const range = prefs.travel_range ?? "";
  if (range === "only_nearby") tags.add("local_explorer");
  else if (range === "within_city") tags.add("city_explorer");
  else if (range === "nearby_towns" || range === "statewide") tags.add("regional_explorer");

  if (prefs.low_cost_priority) tags.add("low_cost_priority");

  const access = prefs.access_preferences ?? [];
  if (access.includes("online_options")) tags.add("online_learner");
  if (access.includes("accessible_places")) tags.add("accessibility_needs");
  if (access.includes("evening_hours")) tags.add("evening_availability");
  if (access.includes("teen_friendly")) tags.add("teen");
  if (access.includes("family_friendly")) tags.add("family_friendly_needs");

  const res = prefs.resource_interests ?? [];
  if (res.includes("jobs") || res.includes("job_training")) tags.add("job_seeker");
  if (res.includes("job_training") || res.includes("certifications")) tags.add("career_growth");
  if (res.includes("free_wifi") || res.includes("computers")) tags.add("digital_access");
  if (res.includes("food") || res.includes("affordable_restaurants")) tags.add("food_access");
  if (res.includes("transportation")) tags.add("transit_needs");
  if (res.includes("education")) tags.add("education_seeker");
  if (res.includes("mentors")) tags.add("mentorship_seeker");
  if (res.includes("events") || res.includes("groups") || res.includes("networking"))
    tags.add("community_oriented");

  const interestMap: Record<string, string> = {
    cosplay: "cosplay_interest",
    comics: "comics_interest",
    anime: "anime_interest",
    gaming: "gaming_interest",
    books: "books_interest",
    art: "art_interest",
    music: "music_interest",
    sports: "sports_interest",
    volunteering: "volunteer_interest",
    technology: "tech_interest",
    coding: "tech_interest",
    business: "business_interest",
    fitness: "fitness_interest",
    fashion: "fashion_interest",
    content_creation: "creator_interest",
    community_service: "volunteer_interest",
  };
  for (const i of prefs.personal_interests ?? []) {
    const key = i.startsWith("custom:") ? i.slice(7) : i;
    if (interestMap[key]) tags.add(interestMap[key]);
  }

  const careerMap: Record<string, string> = {
    healthcare: "healthcare_interest",
    education: "education_interest",
    technology: "tech_interest",
    design: "design_interest",
    trades: "trades_interest",
    business: "business_interest",
    government: "government_interest",
    nonprofit: "nonprofit_interest",
    media: "media_interest",
    hospitality: "hospitality_interest",
    law: "law_interest",
    science: "science_interest",
    entrepreneurship: "entrepreneur",
  };
  for (const c of prefs.career_interests ?? []) {
    const key = c.startsWith("custom:") ? c.slice(7) : c;
    if (careerMap[key]) tags.add(careerMap[key]);
  }

  const cp = prefs.content_preference ?? "";
  if (cp === "community" || cp === "both") tags.add("community_oriented");
  if (cp === "service" || cp === "both") tags.add("service_focused");

  const ep = prefs.engagement_preference ?? "";
  if (ep === "groups" || ep === "both") tags.add("group_engaged");

  return [...tags];
}
