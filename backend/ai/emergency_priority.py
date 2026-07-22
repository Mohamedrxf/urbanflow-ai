class EmergencyPriorityEngine:
    def calculate_priority(self, vehicle):
        vehicle_type = getattr(vehicle, "vehicle_type", "").lower()

        if vehicle_type == "ambulance":
            priority_level = "CRITICAL"
            priority_score = 100
        elif vehicle_type == "fire_truck":
            priority_level = "CRITICAL"
            priority_score = 95
        elif vehicle_type == "police":
            priority_level = "HIGH"
            priority_score = 90
        else:
            priority_level = "NORMAL"
            priority_score = 50

        recommended_actions = {
            "CRITICAL": "Clear traffic and prioritize routing",
            "HIGH": "Prioritize at intersections",
            "NORMAL": "Standard routing",
            "LOW": "No action required",
        }

        return {
            "vehicle_id": getattr(vehicle, "vehicle_id", None),
            "is_emergency": priority_level in ("HIGH", "CRITICAL"),
            "priority_level": priority_level,
            "recommended_action": recommended_actions.get(priority_level, "Standard routing"),
            "priority_score": priority_score,
        }
