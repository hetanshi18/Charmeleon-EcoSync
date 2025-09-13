import { supabase } from "../../supabase/supabaseClient.ts";

// Fetch potential users
export const getPotentialUsers = async (currentUserId: string) => {
  const { data: swipes } = await supabase
    .from("swipes")
    .select("target_id")
    .eq("swiper_id", currentUserId);

  const swipedIds = swipes?.map((s) => s.target_id) || [];

  let query = supabase
    .from("users")
    .select("id, full_name, username, sustainability_score, user_type, is_verified")
    .neq("id", currentUserId);

  if (swipedIds.length > 0) {
    query = query.not("id", "in", `(${swipedIds.join(",")})`);
  }

  const { data: users, error } = await query;
  if (error) console.error(error);
  return users || [];
};

// Record a swipe
export const recordSwipe = async (swiperId: string, targetId: string, direction: "left" | "right") => {
  const { data, error } = await supabase
    .from("swipes")
    .insert([{ swiper_id: swiperId, target_id: targetId, direction }]);

  if (error) console.error(error);
  return data;
};

// Check for a match
export const checkForMatch = async (currentUserId: string, targetId: string) => {
  const { data, error } = await supabase
    .from("swipes")
    .select("*")
    .eq("swiper_id", targetId)
    .eq("target_id", currentUserId)
    .eq("direction", "right");

  if (data && data.length > 0) {
    await supabase.from("matches").insert([{ user_a: currentUserId, user_b: targetId }]);
    return true;
  }
  return false;
};
