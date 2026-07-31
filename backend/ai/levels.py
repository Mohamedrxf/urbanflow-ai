"""Shared ordinal values for congestion and severity levels."""

LEVEL_VALUES = {"low": 1, "medium": 2, "high": 3}


def level_value(level) -> int:
    """Map a congestion or severity label to its ordinal value (0 when unknown)."""
    return LEVEL_VALUES.get((level or "").lower(), 0)
