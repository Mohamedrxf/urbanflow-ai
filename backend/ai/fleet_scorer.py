"""Fleet scoring module for evaluating overall fleet performance."""


class FleetScorer:
    def calculate_fleet_score(self, fleet_results):
        """Calculate fleet performance metrics.

        Args:
            fleet_results: List of optimized vehicle assignments.

        Returns:
            dict: Fleet performance metrics.
        """
        if not fleet_results:
            return {
                "fleet_score": 0,
                "average_route_score": 0,
                "average_time_saved": 0,
                "optimized_vehicle_count": 0,
                "total_vehicle_count": 0,
                "fleet_efficiency": "LOW",
            }

        total_vehicles = len(fleet_results)
        route_scores = [item.get("route_score", 0) for item in fleet_results]
        time_saved_values = [item.get("time_saved", 0) for item in fleet_results]

        average_route_score = sum(route_scores) / total_vehicles
        average_time_saved = sum(time_saved_values) / total_vehicles

        optimized_vehicle_count = sum(1 for score in route_scores if score >= 70)

        fleet_score = round(average_route_score, 2)

        if fleet_score >= 85:
            fleet_efficiency = "HIGH"
        elif fleet_score >= 70:
            fleet_efficiency = "MEDIUM"
        else:
            fleet_efficiency = "LOW"

        return {
            "fleet_score": fleet_score,
            "average_route_score": round(average_route_score, 2),
            "average_time_saved": round(average_time_saved, 2),
            "optimized_vehicle_count": optimized_vehicle_count,
            "total_vehicle_count": total_vehicles,
            "fleet_efficiency": fleet_efficiency,
        }
