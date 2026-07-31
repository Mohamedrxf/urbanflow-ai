from backend.ai import prediction_engine, prediction_service


def test_generate_prediction_pipes_features_into_predictor(monkeypatch):
    calls = {}

    def fake_build_features(db):
        calls["db"] = db
        return [{"congestion_level": "high"}]

    def fake_predict_traffic(features):
        calls["features"] = features
        return ["prediction"]

    monkeypatch.setattr(prediction_engine, "build_features", fake_build_features)
    monkeypatch.setattr(prediction_engine, "predict_traffic", fake_predict_traffic)

    result = prediction_engine.generate_prediction("session", {"ignored": True})

    assert result == ["prediction"]
    assert calls["db"] == "session"
    assert calls["features"] == [{"congestion_level": "high"}]


def test_get_predictions_delegates_to_engine(monkeypatch):
    monkeypatch.setattr(
        prediction_service, "generate_prediction", lambda db, data: (db, data)
    )

    assert prediction_service.get_predictions("session", {"a": 1}) == ("session", {"a": 1})


def test_get_predictions_end_to_end(db_session):
    predictions = prediction_service.get_predictions(db_session, {})

    assert len(predictions) == 1
    assert predictions[0]["road_id"] == "road_0"
