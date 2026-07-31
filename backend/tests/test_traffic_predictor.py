import pytest

from backend.ai.traffic_predictor import predict_traffic


def make_feature(**overrides):
    feature = {
        "congestion_level": "low",
        "traffic_density": 1.0,
        "highest_severity": "low",
        "current_hour": 3,
        "weekend_flag": 0,
    }
    feature.update(overrides)
    return feature


def test_predict_traffic_empty_features():
    assert predict_traffic([]) == []


def test_predict_traffic_low_congestion():
    prediction = predict_traffic(
        [make_feature(congestion_level="low", traffic_density=0.0, highest_severity=None)]
    )[0]

    assert prediction["road_id"] == "road_0"
    assert prediction["current_congestion"] == "LOW"
    assert prediction["predicted_congestion"] == "LOW"
    assert prediction["prediction_minutes"] == 15


@pytest.mark.parametrize(
    "congestion,density,severity,expected",
    [
        ("low", 0.0, None, "LOW"),
        ("medium", 2.0, "medium", "MEDIUM"),
        ("high", 3.0, "high", "HIGH"),
    ],
)
def test_predict_traffic_levels(congestion, density, severity, expected):
    prediction = predict_traffic(
        [
            make_feature(
                congestion_level=congestion,
                traffic_density=density,
                highest_severity=severity,
                current_hour=3,
            )
        ]
    )[0]

    assert prediction["predicted_congestion"] == expected


def test_predict_traffic_peak_hour_increases_confidence():
    off_peak = predict_traffic([make_feature(current_hour=3)])[0]
    peak = predict_traffic([make_feature(current_hour=8)])[0]

    assert peak["confidence"] > off_peak["confidence"]


def test_predict_traffic_confidence_is_capped():
    prediction = predict_traffic(
        [
            make_feature(
                congestion_level="high",
                traffic_density=100.0,
                highest_severity="high",
                current_hour=18,
            )
        ]
    )[0]

    assert prediction["confidence"] == 0.99


def test_predict_traffic_unknown_values():
    prediction = predict_traffic(
        [{"congestion_level": None, "traffic_density": "n/a", "highest_severity": None}]
    )[0]

    assert prediction["current_congestion"] == "UNKNOWN"
    assert prediction["predicted_congestion"] == "LOW"
    assert prediction["confidence"] == 0.7


def test_predict_traffic_indexes_road_ids():
    predictions = predict_traffic([make_feature(), make_feature()])

    assert [p["road_id"] for p in predictions] == ["road_0", "road_1"]
