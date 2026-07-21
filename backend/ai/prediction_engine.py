"""Prediction engine for orchestrating AI traffic predictions."""


from backend.ai.feature_builder import build_features
from backend.ai.traffic_predictor import predict_traffic


def generate_prediction(db, input_data):
    """Generate a complete traffic prediction from raw input data.

    Args:
        db: Database session for querying feature data.
        input_data: Raw data to be processed into a prediction.

    Returns:
        A structured prediction object.
    """
    features = build_features(db)
    predictions = predict_traffic(features)
    return predictions
