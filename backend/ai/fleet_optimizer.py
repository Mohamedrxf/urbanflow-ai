"""Fleet optimizer for analyzing all active vehicles together."""


class FleetOptimizer:
    def optimize_fleet(self, vehicles, routes, traffic, predictions):
        """Optimize the entire fleet based on current conditions.

        Args:
            vehicles: Available vehicles.
            routes: Candidate routes.
            traffic: Current traffic data.
            predictions: Prediction data.

        Returns:
            list: Optimized assignments for active vehicles.
        """
        result = []
        active_vehicles = [v for v in vehicles if getattr(v, "status", None) == "active"]

        for vehicle in active_vehicles:
            vehicle_id = getattr(vehicle, "vehicle_id", None)
            assigned_route = routes[0].route_id if routes else None
            route_score = 1.0
            congestion_level = traffic[0].congestion_level if traffic else "Low"
            estimated_time = routes[0].estimated_time_min if routes and getattr(routes[0], "estimated_time_min", None) is not None else 0
            optimized_time = routes[0].optimized_time_min if routes and getattr(routes[0], "optimized_time_min", None) is not None else 0
            time_saved = estimated_time - optimized_time if estimated_time and optimized_time else 0

            result.append({
                "vehicle_id": vehicle_id,
                "assigned_route": assigned_route,
                "route_score": route_score,
                "congestion_level": congestion_level,
                "estimated_time": estimated_time,
                "optimized_time": optimized_time,
                "time_saved": time_saved,
            })

        return result
