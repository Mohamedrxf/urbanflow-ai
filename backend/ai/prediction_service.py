"""Prediction service for exposing traffic predictions."""


from backend.ai.prediction_engine import generate_prediction


def get_predictions(db, input_data):
    """Retrieve predictions from the AI engine.

    Args:
        db: Database session for querying feature data.
        input_data: Raw input data to be processed into predictions.

    Returns:
        A list of prediction dictionaries from the engine.
    """
    return generate_prediction(db, input_data)
