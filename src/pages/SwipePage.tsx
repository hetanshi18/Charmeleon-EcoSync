import { useEffect, useState } from "react";
import { getPotentialUsers, recordSwipe, checkForMatch } from "../api/swipeService";
import { useAuth } from "../contexts/AuthContext";

function SwipePage() {
  const { user } = useAuth();   // ✅ use the correct property from AuthContext
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return; // safeguard for unauthenticated state

    const loadUsers = async () => {
      const fetched = await getPotentialUsers(user.id);
      setUsers(fetched || []);  // fallback to [] in case API returns null
    };
    loadUsers();
  }, [user]);

  const handleSwipe = async (targetId: string, direction: "left" | "right") => {
    if (!user) return;

    await recordSwipe(user.id, targetId, direction);

    if (direction === "right") {
      const matched = await checkForMatch(user.id, targetId);
      if (matched) {
        alert(`You matched with ${targetId}! Eco Quest unlocked 🌱`);
        // TODO: trigger Lottie animation here
      }
    }

    setUsers((prev) => prev.filter((u) => u.id !== targetId));
  };

  return (
    <div>
      {users.map((user) => (
        <div key={user.id} className="card">
          <h3>{user.full_name} (@{user.username})</h3>
          <p>Eco Score: {user.sustainability_score}</p>
          <p>Type: {user.user_type}</p>
          {user.is_verified && <span>✔ Verified</span>}
          <div>
            <button onClick={() => handleSwipe(user.id, "left")}>Left</button>
            <button onClick={() => handleSwipe(user.id, "right")}>Right</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SwipePage;
